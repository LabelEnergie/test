"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GoCardlessService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoCardlessService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const GoCardless = require('gocardless-nodejs');
let GoCardlessService = GoCardlessService_1 = class GoCardlessService {
    constructor() {
        this.logger = new common_1.Logger(GoCardlessService_1.name);
        this.environment = process.env.GOCARDLESS_ENV === 'production' ? 'live' : 'sandbox';
        this.validateConfiguration();
        this.initializeClient();
    }
    validateConfiguration() {
        const requiredEnvVars = [
            'GOCARDLESS_ACCESS_TOKEN',
            'GOCARDLESS_WEBHOOK_SECRET'
        ];
        for (const envVar of requiredEnvVars) {
            if (!process.env[envVar]) {
                throw new Error(`Missing required environment variable: ${envVar}`);
            }
        }
        const token = process.env.GOCARDLESS_ACCESS_TOKEN;
        if (this.environment === 'live' && !token.startsWith('live_')) {
            throw new Error('Production token must start with "live_"');
        }
        if (this.environment === 'sandbox' && !token.startsWith('sandbox_')) {
            throw new Error('Sandbox token must start with "sandbox_"');
        }
    }
    initializeClient() {
        try {
            this.client = new GoCardless(process.env.GOCARDLESS_ACCESS_TOKEN, this.environment, {
                version: '2023-06-01',
                timeout: 15000
            });
            this.logger.log(`GoCardless client initialized in ${this.environment} mode`);
        }
        catch (error) {
            this.logger.error('Failed to initialize GoCardless client', error.stack);
            throw new common_1.HttpException('Payment system configuration error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCustomer(email, paymentMethodId) {
        try {
            const customer = await this.client.customers.create({
                email,
                metadata: {
                    payment_method_id: paymentMethodId,
                    created_at: new Date().toISOString()
                }
            });
            this.logger.debug(`Customer created: ${customer.id}`);
            return { id: customer.id };
        }
        catch (error) {
            this.logger.error(`Customer creation failed: ${error.message}`, {
                email,
                errorCode: error.code
            });
            throw new common_1.HttpException(`GoCardless customer creation failed: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPriceId(email, interval, type, productIds, amount) {
        try {
            const basePrices = {
                essentiel: 1000,
                liberte: 2000,
                securite: 3000
            };
            const basePrice = basePrices[type] || 1000;
            const calculatedAmount = amount || (productIds.length * basePrice);
            return `gc_${type}_${interval}_${calculatedAmount}`;
        }
        catch (error) {
            this.logger.error(`Price ID generation failed: ${error.message}`);
            throw new common_1.HttpException(`Price calculation failed: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createSubscription(customerId, paymentMethodId, priceId) {
        try {
            const [_, type, interval, amountStr] = priceId.split('_');
            const amount = parseInt(amountStr);
            const mandate = await this.client.mandates.create({
                scheme: 'sepa_core',
                links: { customer: customerId },
                metadata: {
                    payment_method: paymentMethodId,
                    created_at: new Date().toISOString()
                }
            });
            const subscription = await this.client.subscriptions.create({
                amount,
                currency: 'EUR',
                interval_unit: interval === 'month' ? 'monthly' : 'yearly',
                links: { mandate: mandate.id },
                metadata: {
                    customer_id: customerId,
                    price_id: priceId
                }
            });
            this.logger.log(`Subscription created successfully`, {
                subscriptionId: subscription.id,
                customerId,
                amount: `${(amount / 100).toFixed(2)} EUR`,
                interval
            });
            return {
                id: subscription.id,
                status: subscription.status,
                mandate_id: mandate.id,
                next_charge_date: subscription.upcoming_payments?.[0]?.charge_date,
                amount,
                currency: 'EUR'
            };
        }
        catch (error) {
            this.logger.error(`Subscription creation failed: ${error.message}`, {
                customerId,
                errorCode: error.code,
                stack: error.stack
            });
            throw new common_1.HttpException(`GoCardless subscription failed: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async handleWebhookEvent(body) {
        try {
            if (!body.events || !Array.isArray(body.events)) {
                throw new Error('Invalid webhook payload format');
            }
            for (const event of body.events) {
                this.logger.debug(`Processing webhook event: ${event.id}`, {
                    resourceType: event.resource_type,
                    action: event.action
                });
                switch (event.resource_type) {
                    case 'payments':
                        await this.processPaymentEvent(event);
                        break;
                    case 'subscriptions':
                        await this.processSubscriptionEvent(event);
                        break;
                    case 'mandates':
                        await this.processMandateEvent(event);
                        break;
                    default:
                        this.logger.warn(`Unhandled event type: ${event.resource_type}`, {
                            eventId: event.id
                        });
                }
            }
        }
        catch (error) {
            this.logger.error(`Webhook processing failed: ${error.message}`, {
                stack: error.stack,
                body: JSON.stringify(body, null, 2)
            });
            throw error;
        }
    }
    async verifyWebhookSignature(signature, body) {
        try {
            if (!signature || !body) {
                this.logger.warn('Missing signature or body');
                return false;
            }
            const webhookSecret = process.env.GOCARDLESS_WEBHOOK_SECRET;
            const [timestampHeader, signatureHeader] = signature.split(',');
            if (!timestampHeader?.startsWith('t=') || !signatureHeader?.startsWith('s=')) {
                this.logger.warn('Invalid signature format');
                return false;
            }
            const timestamp = timestampHeader.slice(2);
            const providedSignature = signatureHeader.slice(2);
            const signaturePayload = `${timestamp}.${body}`;
            const calculatedSignature = (0, crypto_1.createHmac)('sha256', webhookSecret)
                .update(signaturePayload)
                .digest('hex');
            return this.secureCompare(providedSignature, calculatedSignature);
        }
        catch (error) {
            this.logger.error('Signature verification failed', { error: error.message });
            return false;
        }
    }
    normalizeWebhookBody(body) {
        if (typeof body === 'string') {
            try {
                return JSON.stringify(JSON.parse(body));
            }
            catch {
                return body;
            }
        }
        return JSON.stringify(body);
    }
    secureCompare(a, b) {
        try {
            const bufferA = Buffer.from(a);
            const bufferB = Buffer.from(b);
            if (bufferA.length !== bufferB.length) {
                return false;
            }
            return (0, crypto_1.timingSafeEqual)(bufferA, bufferB);
        }
        catch {
            return false;
        }
    }
    logVerificationDetails(received, calculated, body, isValid) {
        this.logger.debug('Webhook Signature Verification', {
            receivedSignature: received?.substring(0, 8) + '...',
            calculatedSignature: calculated?.substring(0, 8) + '...',
            bodyLength: body.length,
            bodyHash: (0, crypto_1.createHash)('sha256').update(body).digest('hex').substring(0, 8) + '...',
            matches: isValid
        });
    }
    async processPaymentEvent(event) {
        try {
            if (!event?.links?.payment) {
                this.logger.warn('Payment event missing required properties', {
                    eventId: event?.id,
                    action: event?.action
                });
                return;
            }
            const paymentData = {
                id: event.links.payment,
                amount: event.details?.amount || 0,
                currency: event.details?.currency || 'EUR',
                status: event.action || 'unknown',
                createdAt: event.created_at ? new Date(event.created_at).toISOString() : new Date().toISOString()
            };
            switch (event.action) {
                case 'created':
                    await this.handlePaymentCreated(paymentData);
                    break;
                case 'confirmed':
                    await this.handlePaymentConfirmed(paymentData);
                    break;
                case 'failed':
                    await this.handlePaymentFailed(paymentData);
                    break;
            }
            this.logger.log(`Payment ${paymentData.status} processed`, paymentData);
        }
        catch (error) {
            this.logger.error(`Failed to process payment event`, {
                eventId: event?.id,
                error: error.message
            });
        }
    }
    async processSubscriptionEvent(event) {
        try {
            if (!event?.links?.subscription) {
                this.logger.warn('Subscription event missing required properties', {
                    eventId: event?.id,
                    action: event?.action
                });
                return;
            }
            const subscriptionData = {
                id: event.links.subscription,
                status: event.action || 'unknown',
                createdAt: event.created_at ? new Date(event.created_at).toISOString() : new Date().toISOString(),
                details: event.details || {}
            };
            switch (event.action) {
                case 'created':
                    await this.handleSubscriptionCreated(subscriptionData);
                    break;
                case 'cancelled':
                    await this.handleSubscriptionCancelled(subscriptionData);
                    break;
                case 'payment_created':
                    await this.handleSubscriptionPayment(subscriptionData);
                    break;
            }
            this.logger.log(`Subscription ${subscriptionData.status} processed`, subscriptionData);
        }
        catch (error) {
            this.logger.error(`Failed to process subscription event`, {
                eventId: event?.id,
                error: error.message
            });
        }
    }
    async processMandateEvent(event) {
        try {
            if (!event?.links?.mandate) {
                this.logger.warn('Mandate event missing required properties', {
                    eventId: event?.id,
                    action: event?.action
                });
                return;
            }
            const mandateData = {
                id: event.links.mandate,
                status: event.action || 'unknown',
                reference: event.details?.reference || null,
                createdAt: event.created_at ? new Date(event.created_at).toISOString() : new Date().toISOString()
            };
            switch (event.action) {
                case 'created':
                    await this.handleMandateCreated(mandateData);
                    break;
                case 'submitted':
                    await this.handleMandateSubmitted(mandateData);
                    break;
                case 'active':
                    await this.handleMandateActivated(mandateData);
                    break;
                case 'failed':
                    await this.handleMandateFailed(mandateData);
                    break;
            }
            this.logger.log(`Mandate ${mandateData.status} processed`, mandateData);
        }
        catch (error) {
            this.logger.error(`Failed to process mandate event`, {
                eventId: event?.id,
                error: error.message
            });
        }
    }
    async handlePaymentCreated(paymentData) {
        this.logger.log('Payment created', paymentData);
    }
    async handlePaymentConfirmed(paymentData) {
        this.logger.log('Payment confirmed', paymentData);
    }
    async handlePaymentFailed(paymentData) {
        this.logger.log('Payment failed', paymentData);
    }
    async handleSubscriptionCreated(subscriptionData) {
        this.logger.log('Subscription created', subscriptionData);
    }
    async handleSubscriptionCancelled(subscriptionData) {
        this.logger.log('Subscription cancelled', subscriptionData);
    }
    async handleSubscriptionPayment(subscriptionData) {
        this.logger.log('Subscription payment processed', subscriptionData);
    }
    async handleMandateCreated(mandateData) {
        this.logger.log('Mandate created', mandateData);
    }
    async handleMandateSubmitted(mandateData) {
        this.logger.log('Mandate submitted', mandateData);
    }
    async handleMandateActivated(mandateData) {
        this.logger.log('Mandate activated', mandateData);
    }
    async handleMandateFailed(mandateData) {
        this.logger.log('Mandate failed', mandateData);
    }
};
exports.GoCardlessService = GoCardlessService;
exports.GoCardlessService = GoCardlessService = GoCardlessService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoCardlessService);
//# sourceMappingURL=gocardless.service.js.map
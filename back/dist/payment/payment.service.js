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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
let PaymentService = class PaymentService {
    constructor() {
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-06-20'
        });
    }
    async createCustomer(email, paymentMethodId) {
        try {
            const customer = await this.stripe.customers.create({
                email,
                payment_method: paymentMethodId,
                invoice_settings: {
                    default_payment_method: paymentMethodId
                }
            });
            return { id: customer.id };
        }
        catch (error) {
            throw new common_1.HttpException(`Stripe customer creation failed: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPriceId(email, interval, type, productIds, amount) {
        try {
            const totalPrice = productIds.length * 1000;
            const price = await this.stripe.prices.create({
                unit_amount: Math.round(totalPrice * 100),
                currency: 'eur',
                recurring: { interval },
                product_data: {
                    name: `Maintenance ${type} - ${interval}ly`
                }
            });
            return price.id;
        }
        catch (error) {
            throw new common_1.HttpException(`Stripe price creation failed: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createSubscription(customerId, paymentMethodId, priceId) {
        try {
            const subscription = await this.stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                payment_settings: {
                    payment_method_types: ['card'],
                    save_default_payment_method: 'on_subscription'
                }
            });
            return {
                id: subscription.id,
                status: subscription.status
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Stripe subscription creation failed: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async handleWebhookEvent(body) {
        console.log('Stripe webhook received (use dedicated Stripe webhook handler)');
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
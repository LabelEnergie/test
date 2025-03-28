import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { IPaymentProvider } from '../interfaces/payment-provider.interface';
import { createHmac, timingSafeEqual, createHash } from 'crypto';
const GoCardless = require('gocardless-nodejs');

@Injectable()
export class GoCardlessService implements IPaymentProvider {
  private readonly logger = new Logger(GoCardlessService.name);
  private client: any;
  private environment: string;

  constructor() {
    this.environment = process.env.GOCARDLESS_ENV === 'production' ? 'live' : 'sandbox';
    this.validateConfiguration();
    this.initializeClient();
  }

  private validateConfiguration() {
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

  private initializeClient() {
    try {
      this.client = new GoCardless(
        process.env.GOCARDLESS_ACCESS_TOKEN,
        this.environment,
        {
          version: '2023-06-01',
          timeout: 15000
        }
      );
      this.logger.log(`GoCardless client initialized in ${this.environment} mode`);
    } catch (error) {
      this.logger.error('Failed to initialize GoCardless client', error.stack);
      throw new HttpException(
        'Payment system configuration error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createCustomer(email: string, paymentMethodId: string): Promise<{ id: string }> {
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
    } catch (error) {
      this.logger.error(`Customer creation failed: ${error.message}`, {
        email,
        errorCode: error.code
      });
      throw new HttpException(
        `GoCardless customer creation failed: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getPriceId(
    email: string,
    interval: 'month' | 'year',
    type: string,
    productIds: number[],
    amount?: number
  ): Promise<string> {
    try {
      const basePrices = {
        essentiel: 1000,
        liberte: 2000,
        securite: 3000
      };

      const basePrice = basePrices[type] || 1000;
      const calculatedAmount = amount || (productIds.length * basePrice);
      
      return `gc_${type}_${interval}_${calculatedAmount}`;
    } catch (error) {
      this.logger.error(`Price ID generation failed: ${error.message}`);
      throw new HttpException(
        `Price calculation failed: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createSubscription(
    customerId: string,
    paymentMethodId: string,
    priceId: string
  ): Promise<any> {
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
    } catch (error) {
      this.logger.error(`Subscription creation failed: ${error.message}`, {
        customerId,
        errorCode: error.code,
        stack: error.stack
      });
      throw new HttpException(
        `GoCardless subscription failed: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async handleWebhookEvent(body: any): Promise<void> {
    try {
      if (!body.events || !Array.isArray(body.events)) {
        throw new Error('Invalid webhook payload format');
      }

      for (const event of body.events) {
        this.logger.debug(`Processing webhook event: ${event.id}`, {
          resourceType: event.resource_type,
          action: event.action
        });

        switch(event.resource_type) {
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
    } catch (error) {
      this.logger.error(`Webhook processing failed: ${error.message}`, {
        stack: error.stack,
        body: JSON.stringify(body, null, 2)
      });
      throw error;
    }
  }

  async verifyWebhookSignature(signature: string, body: string): Promise<boolean> {
    try {
      if (!signature || !body) {
        this.logger.warn('Missing signature or body');
        return false;
      }

      const webhookSecret = process.env.GOCARDLESS_WEBHOOK_SECRET;
      
      // Parse signature header
      const [timestampHeader, signatureHeader] = signature.split(',');
      if (!timestampHeader?.startsWith('t=') || !signatureHeader?.startsWith('s=')) {
        this.logger.warn('Invalid signature format');
        return false;
      }

      const timestamp = timestampHeader.slice(2);
      const providedSignature = signatureHeader.slice(2);

      // Create signature payload
      const signaturePayload = `${timestamp}.${body}`;

      // Calculate HMAC
      const calculatedSignature = createHmac('sha256', webhookSecret)
        .update(signaturePayload)
        .digest('hex');

      return this.secureCompare(providedSignature, calculatedSignature);
    } catch (error) {
      this.logger.error('Signature verification failed', { error: error.message });
      return false;
    }
  }

  private normalizeWebhookBody(body: string | object): string {
    if (typeof body === 'string') {
      try {
        return JSON.stringify(JSON.parse(body));
      } catch {
        return body;
      }
    }
    return JSON.stringify(body);
  }

  private secureCompare(a: string, b: string): boolean {
    try {
      const bufferA = Buffer.from(a);
      const bufferB = Buffer.from(b);
      
      if (bufferA.length !== bufferB.length) {
        return false;
      }
      
      return timingSafeEqual(bufferA, bufferB);
    } catch {
      return false;
    }
  }

  private logVerificationDetails(
    received: string, 
    calculated: string,
    body: string,
    isValid: boolean
  ) {
    this.logger.debug('Webhook Signature Verification', {
      receivedSignature: received?.substring(0, 8) + '...',
      calculatedSignature: calculated?.substring(0, 8) + '...',
      bodyLength: body.length,
      bodyHash: createHash('sha256').update(body).digest('hex').substring(0, 8) + '...',
      matches: isValid
    });
  }

  private async processPaymentEvent(event: any) {
    try {
      // Vérification des propriétés requises
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
    } catch (error) {
      this.logger.error(`Failed to process payment event`, {
        eventId: event?.id,
        error: error.message
      });
    }
  }

  private async processSubscriptionEvent(event: any) {
    try {
      // Vérification des propriétés requises
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
    } catch (error) {
      this.logger.error(`Failed to process subscription event`, {
        eventId: event?.id,
        error: error.message
      });
    }
  }

  private async processMandateEvent(event: any) {
    try {
      // Vérification des propriétés requises
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
    } catch (error) {
      this.logger.error(`Failed to process mandate event`, {
        eventId: event?.id,
        error: error.message
      });
    }
  }

  // Méthodes de traitement des paiements
  private async handlePaymentCreated(paymentData: any): Promise<void> {
    this.logger.log('Payment created', paymentData);
    // Implémenter la logique spécifique (ex: mise à jour BDD)
  }

  private async handlePaymentConfirmed(paymentData: any): Promise<void> {
    this.logger.log('Payment confirmed', paymentData);
    // Implémenter la logique spécifique (ex: envoi email confirmation)
  }

  private async handlePaymentFailed(paymentData: any): Promise<void> {
    this.logger.log('Payment failed', paymentData);
    // Implémenter la logique spécifique (ex: notification échec)
  }

  // Méthodes de traitement des abonnements
  private async handleSubscriptionCreated(subscriptionData: any): Promise<void> {
    this.logger.log('Subscription created', subscriptionData);
    // Implémenter la logique spécifique
  }

  private async handleSubscriptionCancelled(subscriptionData: any): Promise<void> {
    this.logger.log('Subscription cancelled', subscriptionData);
    // Implémenter la logique spécifique
  }

  private async handleSubscriptionPayment(subscriptionData: any): Promise<void> {
    this.logger.log('Subscription payment processed', subscriptionData);
    // Implémenter la logique spécifique
  }

  // Méthodes de traitement des mandats
  private async handleMandateCreated(mandateData: any): Promise<void> {
    this.logger.log('Mandate created', mandateData);
    // Implémenter la logique spécifique
  }

  private async handleMandateSubmitted(mandateData: any): Promise<void> {
    this.logger.log('Mandate submitted', mandateData);
    // Implémenter la logique spécifique
  }

  private async handleMandateActivated(mandateData: any): Promise<void> {
    this.logger.log('Mandate activated', mandateData);
    // Implémenter la logique spécifique
  }

  private async handleMandateFailed(mandateData: any): Promise<void> {
    this.logger.log('Mandate failed', mandateData);
    // Implémenter la logique spécifique
  }
}
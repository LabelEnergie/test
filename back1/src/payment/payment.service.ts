import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IPaymentProvider } from './interfaces/payment-provider.interface';
import Stripe from 'stripe';

@Injectable()
export class PaymentService implements IPaymentProvider {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20'
    });
  }

  async createCustomer(email: string, paymentMethodId: string): Promise<{ id: string }> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });
      return { id: customer.id };
    } catch (error) {
      throw new HttpException(
        `Stripe customer creation failed: ${error.message}`,
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
      // Calcul simplifié sans toolsService
      const totalPrice = productIds.length * 1000; // Exemple: 10€ par produit
      const price = await this.stripe.prices.create({
        unit_amount: Math.round(totalPrice * 100),
        currency: 'eur',
        recurring: { interval },
        product_data: {
          name: `Maintenance ${type} - ${interval}ly`
        }
      });
      return price.id;
    } catch (error) {
      throw new HttpException(
        `Stripe price creation failed: ${error.message}`,
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
    } catch (error) {
      throw new HttpException(
        `Stripe subscription creation failed: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async handleWebhookEvent(body: any): Promise<void> {
    console.log('Stripe webhook received (use dedicated Stripe webhook handler)');
  }
}
import { HttpStatus, Injectable } from '@nestjs/common';
import { ENV } from 'src/constants';
import { ToolsService } from 'src/tools/tools.service';
import { throwError } from 'src/utils/error';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly toolsService: ToolsService) {
    const { STRIPE } = ENV();
    this.stripe = new Stripe(STRIPE.SECRET_KEY, {
      apiVersion: '2024-06-20'
    });
  }

  async createCustomer(email: string, paymentMethodId: string) {
    try {
      return await this.stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId }
      });
    } catch (error) {
      throwError('Error creating customer', HttpStatus.BAD_REQUEST);
    }
  }

  async getPriceIdByType(email: string, interval: 'month' | 'year', type: string, productIds: number[]) {
    try {
      const { totalPrice } = await this.toolsService.getCustomContractPrice(type, productIds);
      // Create or get price from Stripe
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
      throwError('Error getting price', HttpStatus.BAD_REQUEST);
    }
  }

  async createSubscription(customerId: string, paymentMethodId: string, priceId: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_settings: {
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription'
        },
        expand: ['latest_invoice.payment_intent']
      });
    } catch (error) {
      throwError('Error creating subscription', HttpStatus.BAD_REQUEST);
    }
  }
}

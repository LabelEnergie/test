import { Body, Controller, Post, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { GoCardlessService } from './gocardless/gocardless.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('payment') // Le préfixe '/api' est géré globalement
export class PaymentController {
  constructor(
    private readonly stripeService: PaymentService,
    private readonly gocardlessService: GoCardlessService
  ) {}

  @Post('create-subscription')
  @Public()
  async createSubscription(
    @Body() body: {
      email: string;
      paymentMethodId: string;
      interval: 'month' | 'year';
      contract: {
        type: 'essentiel' | 'liberte' | 'securite';
        productIds: number[];
      };
    },
    @Query('provider') provider: string = 'stripe'
  ) {
    try {
      // Correction automatique de la faute de frappe
      provider = provider.toLowerCase();
      if (provider === 'gocardles') provider = 'gocardless';

      const service = provider === 'stripe' 
        ? this.stripeService 
        : this.gocardlessService;

      if (!service) {
        throw new HttpException(
          'Invalid payment provider. Use "stripe" or "gocardless"',
          HttpStatus.BAD_REQUEST
        );
      }

      const customer = await service.createCustomer(body.email, body.paymentMethodId);
      const priceId = await service.getPriceId(
        body.email,
        body.interval,
        body.contract.type,
        body.contract.productIds
      );
      const subscription = await service.createSubscription(
        customer.id,
        body.paymentMethodId,
        priceId
      );

      return {
        success: true,
        provider,
        subscriptionId: subscription.id,
        status: subscription.status,
        customerId: customer.id
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          provider
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
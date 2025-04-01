import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TCreatePaymentBody } from './payment.type';
import { Public } from 'src/constants';
import { throwError } from 'src/utils/error';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-subscription')
  @Public()
  async createSubscription(@Body() body: TCreatePaymentBody) {
    try {
      // Create Stripe Client
      const customer = await this.paymentService.createCustomer(
        body.email,
        body.paymentMethodId,
      );

      // Get priceId
      const priceId = await this.paymentService.getPriceIdByType(
        body.email,
        body.interval,
        body.contract.type,
        body.contract.productIds,
      );

      // Create subscription
      const subscription = await this.paymentService.createSubscription(
        customer.id,
        body.paymentMethodId,
        priceId,
      );

      return subscription;
    } catch (error) {
      console.log(error);
      throwError(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { GoCardlessService } from './gocardless/gocardless.service';
import { GoCardlessWebhookController } from './gocardless/gocardless.webhook.controller';

@Module({
  controllers: [PaymentController, GoCardlessWebhookController],
  providers: [PaymentService, GoCardlessService],
  exports: [PaymentService, GoCardlessService]
})
export class PaymentModule {}
import { Body, Controller, Headers, Post, HttpException, HttpStatus, Logger, RawBodyRequest, Req } from '@nestjs/common';
import { GoCardlessService } from './gocardless.service';
import { Request } from 'express';

@Controller('webhooks/gocardless')
export class GoCardlessWebhookController {
  private readonly logger = new Logger(GoCardlessWebhookController.name);

  constructor(private readonly goCardlessService: GoCardlessService) {}

  @Post()
  async handleWebhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('Webhook-Signature') signature: string
  ) {
    const requestId = this.generateRequestId();
    this.logger.debug(`Webhook received [${requestId}]`);

    try {
      const rawBody = request.rawBody?.toString();
      
      if (!rawBody) {
        throw new HttpException('Missing request body', HttpStatus.BAD_REQUEST);
      }

      const isValid = await this.goCardlessService.verifyWebhookSignature(
        signature,
        rawBody
      );

      if (!isValid) {
        throw new HttpException('Invalid signature', HttpStatus.UNAUTHORIZED);
      }

      const body = JSON.parse(rawBody);
      await this.goCardlessService.handleWebhookEvent(body);
      
      return { status: 'success' };
    } catch (error) {
      this.logger.error(`Webhook failed [${requestId}]`, { error: error.message });
      throw error;
    }
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
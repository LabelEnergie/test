import { Controller, Post, Body, Headers, HttpStatus, HttpException } from '@nestjs/common';
import { Public } from '../../auth/decorators/public.decorator';
import { GoCardlessService } from './gocardless.service';
import { Logger } from '@nestjs/common';

@Controller('webhooks/gocardless')
export class GoCardlessWebhookController {
  private readonly logger = new Logger(GoCardlessWebhookController.name);

  constructor(private readonly gocardlessService: GoCardlessService) {}

  @Post()
  @Public()
  async handleWebhook(
    @Body() body: any,
    @Headers() headers: any
  ) {
    const requestId = headers['x-request-id'] || Math.random().toString(36).substring(2, 9);
    
    try {
      this.logger.debug(`Webhook received [${requestId}]`, {
        eventType: body.events?.[0]?.resource_type,
        action: body.events?.[0]?.action,
        headers: Object.keys(headers)
      });

      const signature = headers['webhook-signature'] || 
                       headers['x-gocardless-signature'] || 
                       headers['x-signature'];

      if (!signature) {
        this.logger.warn(`Missing signature header [${requestId}]`, {
          availableHeaders: Object.keys(headers)
        });
        throw new HttpException('Missing signature', HttpStatus.UNAUTHORIZED);
      }

      // Remove formatting from body to match GoCardless signature calculation
      const rawBody = typeof body === 'string' ? body : JSON.stringify(body);
      
      this.logger.debug(`Request details [${requestId}]`, {
        bodyLength: rawBody.length,
        bodyPreview: rawBody.substring(0, 100),
        signatureLength: signature.length,
        signaturePreview: signature.substring(0, 10)
      });

      const isValid = await this.gocardlessService.verifyWebhookSignature(signature, rawBody);

      if (!isValid) {
        this.logger.warn(`Invalid signature [${requestId}]`, {
          signaturePresent: true,
          signatureLength: signature.length,
          bodyLength: rawBody.length,
          bodyPreview: rawBody.substring(0, 50)
        });
        throw new HttpException('Invalid signature', HttpStatus.UNAUTHORIZED);
      }

      await this.gocardlessService.handleWebhookEvent(body);
      
      return { 
        status: 'processed',
        requestId
      };
    } catch (error) {
      this.logger.error(`Webhook processing failed [${requestId}]`, {
        error: error.message,
        stack: error.stack
      });

      throw new HttpException(
        error.response || error.message || 'Webhook processing failed',
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }
}
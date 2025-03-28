import { RawBodyRequest } from '@nestjs/common';
import { GoCardlessService } from './gocardless.service';
import { Request } from 'express';
export declare class GoCardlessWebhookController {
    private readonly goCardlessService;
    private readonly logger;
    constructor(goCardlessService: GoCardlessService);
    handleWebhook(request: RawBodyRequest<Request>, signature: string): Promise<{
        status: string;
    }>;
    private generateRequestId;
}

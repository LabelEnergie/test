import { GoCardlessService } from './gocardless.service';
export declare class GoCardlessWebhookController {
    private readonly gocardlessService;
    private readonly logger;
    constructor(gocardlessService: GoCardlessService);
    handleWebhook(body: any, headers: any): Promise<{
        status: string;
        requestId: any;
    }>;
}

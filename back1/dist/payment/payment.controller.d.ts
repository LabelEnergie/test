import { PaymentService } from './payment.service';
import { GoCardlessService } from './gocardless/gocardless.service';
export declare class PaymentController {
    private readonly stripeService;
    private readonly gocardlessService;
    constructor(stripeService: PaymentService, gocardlessService: GoCardlessService);
    createSubscription(body: {
        email: string;
        paymentMethodId: string;
        interval: 'month' | 'year';
        contract: {
            type: 'essentiel' | 'liberte' | 'securite';
            productIds: number[];
        };
    }, provider?: string): Promise<{
        success: boolean;
        provider: string;
        subscriptionId: any;
        status: any;
        customerId: string;
    }>;
}

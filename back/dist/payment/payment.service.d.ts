import { ToolsService } from 'src/tools/tools.service';
import Stripe from 'stripe';
export declare class PaymentService {
    private readonly toolsService;
    private stripe;
    constructor(toolsService: ToolsService);
    createCustomer(email: string, paymentMethodId: string): Promise<Stripe.Response<Stripe.Customer>>;
    getPriceIdByType(email: string, interval: 'month' | 'year', type: string, productIds: number[]): Promise<string>;
    createSubscription(customerId: string, paymentMethodId: string, priceId: string): Promise<Stripe.Response<Stripe.Subscription>>;
}

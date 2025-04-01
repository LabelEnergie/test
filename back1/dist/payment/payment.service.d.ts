import { IPaymentProvider } from './interfaces/payment-provider.interface';
export declare class PaymentService implements IPaymentProvider {
    private stripe;
    constructor();
    createCustomer(email: string, paymentMethodId: string): Promise<{
        id: string;
    }>;
    getPriceId(email: string, interval: 'month' | 'year', type: string, productIds: number[], amount?: number): Promise<string>;
    createSubscription(customerId: string, paymentMethodId: string, priceId: string): Promise<any>;
    handleWebhookEvent(body: any): Promise<void>;
}

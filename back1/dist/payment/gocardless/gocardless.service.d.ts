import { IPaymentProvider } from '../interfaces/payment-provider.interface';
export declare class GoCardlessService implements IPaymentProvider {
    private readonly logger;
    private client;
    private environment;
    constructor();
    private validateConfiguration;
    private initializeClient;
    createCustomer(email: string, paymentMethodId: string): Promise<{
        id: string;
    }>;
    getPriceId(email: string, interval: 'month' | 'year', type: string, productIds: number[], amount?: number): Promise<string>;
    createSubscription(customerId: string, paymentMethodId: string, priceId: string): Promise<any>;
    handleWebhookEvent(body: any): Promise<void>;
    verifyWebhookSignature(signature: string, body: string): Promise<boolean>;
    private normalizeWebhookBody;
    private secureCompare;
    private logVerificationDetails;
    private processPaymentEvent;
    private processSubscriptionEvent;
    private processMandateEvent;
    private handlePaymentCreated;
    private handlePaymentConfirmed;
    private handlePaymentFailed;
    private handleSubscriptionCreated;
    private handleSubscriptionCancelled;
    private handleSubscriptionPayment;
    private handleMandateCreated;
    private handleMandateSubmitted;
    private handleMandateActivated;
    private handleMandateFailed;
}

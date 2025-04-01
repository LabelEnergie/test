import { PaymentService } from './payment.service';
import { TCreatePaymentBody } from './payment.type';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createSubscription(body: TCreatePaymentBody): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>>;
}

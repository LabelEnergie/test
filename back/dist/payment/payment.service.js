"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const tools_service_1 = require("../tools/tools.service");
const error_1 = require("../utils/error");
const stripe_1 = require("stripe");
let PaymentService = class PaymentService {
    constructor(toolsService) {
        this.toolsService = toolsService;
        const { STRIPE } = (0, constants_1.ENV)();
        this.stripe = new stripe_1.default(STRIPE.SECRET_KEY, {
            apiVersion: '2024-06-20'
        });
    }
    async createCustomer(email, paymentMethodId) {
        try {
            return await this.stripe.customers.create({
                email,
                payment_method: paymentMethodId,
                invoice_settings: { default_payment_method: paymentMethodId }
            });
        }
        catch (error) {
            (0, error_1.throwError)('Error creating customer', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPriceIdByType(email, interval, type, productIds) {
        try {
            const { totalPrice } = await this.toolsService.getCustomContractPrice(type, productIds);
            const price = await this.stripe.prices.create({
                unit_amount: Math.round(totalPrice * 100),
                currency: 'eur',
                recurring: { interval },
                product_data: {
                    name: `Maintenance ${type} - ${interval}ly`
                }
            });
            return price.id;
        }
        catch (error) {
            (0, error_1.throwError)('Error getting price', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createSubscription(customerId, paymentMethodId, priceId) {
        try {
            return await this.stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                payment_settings: {
                    payment_method_types: ['card'],
                    save_default_payment_method: 'on_subscription'
                },
                expand: ['latest_invoice.payment_intent']
            });
        }
        catch (error) {
            (0, error_1.throwError)('Error creating subscription', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tools_service_1.ToolsService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
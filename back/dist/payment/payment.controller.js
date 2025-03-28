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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const gocardless_service_1 = require("./gocardless/gocardless.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let PaymentController = class PaymentController {
    constructor(stripeService, gocardlessService) {
        this.stripeService = stripeService;
        this.gocardlessService = gocardlessService;
    }
    async createSubscription(body, provider = 'stripe') {
        try {
            provider = provider.toLowerCase();
            if (provider === 'gocardles')
                provider = 'gocardless';
            const service = provider === 'stripe'
                ? this.stripeService
                : this.gocardlessService;
            if (!service) {
                throw new common_1.HttpException('Invalid payment provider. Use "stripe" or "gocardless"', common_1.HttpStatus.BAD_REQUEST);
            }
            const customer = await service.createCustomer(body.email, body.paymentMethodId);
            const priceId = await service.getPriceId(body.email, body.interval, body.contract.type, body.contract.productIds);
            const subscription = await service.createSubscription(customer.id, body.paymentMethodId, priceId);
            return {
                success: true,
                provider,
                subscriptionId: subscription.id,
                status: subscription.status,
                customerId: customer.id
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
                provider
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('create-subscription'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createSubscription", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        gocardless_service_1.GoCardlessService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map
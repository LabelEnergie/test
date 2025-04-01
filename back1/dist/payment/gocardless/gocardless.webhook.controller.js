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
var GoCardlessWebhookController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoCardlessWebhookController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
const gocardless_service_1 = require("./gocardless.service");
const common_2 = require("@nestjs/common");
let GoCardlessWebhookController = GoCardlessWebhookController_1 = class GoCardlessWebhookController {
    constructor(gocardlessService) {
        this.gocardlessService = gocardlessService;
        this.logger = new common_2.Logger(GoCardlessWebhookController_1.name);
    }
    async handleWebhook(body, headers) {
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
                throw new common_1.HttpException('Missing signature', common_1.HttpStatus.UNAUTHORIZED);
            }
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
                throw new common_1.HttpException('Invalid signature', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.gocardlessService.handleWebhookEvent(body);
            return {
                status: 'processed',
                requestId
            };
        }
        catch (error) {
            this.logger.error(`Webhook processing failed [${requestId}]`, {
                error: error.message,
                stack: error.stack
            });
            throw new common_1.HttpException(error.response || error.message || 'Webhook processing failed', error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.GoCardlessWebhookController = GoCardlessWebhookController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoCardlessWebhookController.prototype, "handleWebhook", null);
exports.GoCardlessWebhookController = GoCardlessWebhookController = GoCardlessWebhookController_1 = __decorate([
    (0, common_1.Controller)('webhooks/gocardless'),
    __metadata("design:paramtypes", [gocardless_service_1.GoCardlessService])
], GoCardlessWebhookController);
//# sourceMappingURL=gocardless.webhook.controller.js.map
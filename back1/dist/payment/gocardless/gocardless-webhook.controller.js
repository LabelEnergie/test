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
const gocardless_service_1 = require("./gocardless.service");
let GoCardlessWebhookController = GoCardlessWebhookController_1 = class GoCardlessWebhookController {
    constructor(goCardlessService) {
        this.goCardlessService = goCardlessService;
        this.logger = new common_1.Logger(GoCardlessWebhookController_1.name);
    }
    async handleWebhook(request, signature) {
        const requestId = this.generateRequestId();
        this.logger.debug(`Webhook received [${requestId}]`);
        try {
            const rawBody = request.rawBody?.toString();
            if (!rawBody) {
                throw new common_1.HttpException('Missing request body', common_1.HttpStatus.BAD_REQUEST);
            }
            const isValid = await this.goCardlessService.verifyWebhookSignature(signature, rawBody);
            if (!isValid) {
                throw new common_1.HttpException('Invalid signature', common_1.HttpStatus.UNAUTHORIZED);
            }
            const body = JSON.parse(rawBody);
            await this.goCardlessService.handleWebhookEvent(body);
            return { status: 'success' };
        }
        catch (error) {
            this.logger.error(`Webhook failed [${requestId}]`, { error: error.message });
            throw error;
        }
    }
    generateRequestId() {
        return Math.random().toString(36).substring(2, 8);
    }
};
exports.GoCardlessWebhookController = GoCardlessWebhookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('Webhook-Signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GoCardlessWebhookController.prototype, "handleWebhook", null);
exports.GoCardlessWebhookController = GoCardlessWebhookController = GoCardlessWebhookController_1 = __decorate([
    (0, common_1.Controller)('webhooks/gocardless'),
    __metadata("design:paramtypes", [gocardless_service_1.GoCardlessService])
], GoCardlessWebhookController);
//# sourceMappingURL=gocardless-webhook.controller.js.map
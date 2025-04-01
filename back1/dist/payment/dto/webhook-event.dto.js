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
exports.GoCardlessWebhookDto = exports.WebhookEventDto = exports.WebhookEventDetailsDto = exports.WebhookEventLinkDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class WebhookEventLinkDto {
}
exports.WebhookEventLinkDto = WebhookEventLinkDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WebhookEventLinkDto.prototype, "payment", void 0);
class WebhookEventDetailsDto {
}
exports.WebhookEventDetailsDto = WebhookEventDetailsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], WebhookEventDetailsDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WebhookEventDetailsDto.prototype, "currency", void 0);
class WebhookEventDto {
}
exports.WebhookEventDto = WebhookEventDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WebhookEventDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WebhookEventDto.prototype, "resource_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WebhookEventDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WebhookEventLinkDto),
    __metadata("design:type", WebhookEventLinkDto)
], WebhookEventDto.prototype, "links", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WebhookEventDetailsDto),
    __metadata("design:type", WebhookEventDetailsDto)
], WebhookEventDto.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WebhookEventDto.prototype, "created_at", void 0);
class GoCardlessWebhookDto {
}
exports.GoCardlessWebhookDto = GoCardlessWebhookDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WebhookEventDto),
    __metadata("design:type", Array)
], GoCardlessWebhookDto.prototype, "events", void 0);
//# sourceMappingURL=webhook-event.dto.js.map
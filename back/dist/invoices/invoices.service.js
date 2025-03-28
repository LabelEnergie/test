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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const error_1 = require("../utils/error");
const crypto_1 = require("crypto");
let InvoicesService = class InvoicesService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async findAll(userId) {
        try {
            return await this.firebaseService.query('invoices', 'userId', '==', userId);
        }
        catch (error) {
            (0, error_1.throwError)('Error fetching invoices', 500);
        }
    }
    async findOne(userId, id) {
        try {
            const invoice = await this.firebaseService.getDocument('invoices', id);
            if (!invoice || invoice.userId !== userId) {
                (0, error_1.throwError)('Invoice not found', 404);
            }
            return invoice;
        }
        catch (error) {
            (0, error_1.throwError)('Error fetching invoice', 500);
        }
    }
    async create(userId, data) {
        try {
            const invoice = {
                id: (0, crypto_1.randomUUID)(),
                userId,
                createdAt: new Date(),
                ...data
            };
            return await this.firebaseService.createDocument('invoices', invoice);
        }
        catch (error) {
            (0, error_1.throwError)('Error creating invoice', 500);
        }
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map
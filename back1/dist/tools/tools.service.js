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
exports.ToolsService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const error_1 = require("../utils/error");
const number_1 = require("../utils/number");
const image_1 = require("../utils/image");
let ToolsService = class ToolsService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async getProducts(productIds) {
        try {
            const products = await this.firebaseService.query('products', 'id', 'in', productIds);
            return products;
        }
        catch (error) {
            (0, error_1.throwError)('Error fetching products', 500);
        }
    }
    formatRowsToProducts(rows) {
        return rows.map((r) => ({
            id: r.id,
            name: r.name,
            image: (0, image_1.getStaticFilePath)(r.image),
            soloPrice: r.soloPrice,
            manyPrice: r.manyPrice,
        }));
    }
    async getCustomContractPrice(type, productIds) {
        const rows = await this.getProducts(productIds);
        const products = this.formatRowsToProducts(rows);
        const priceByType = this.getPriceByType(type);
        const productPrices = products.map((product) => {
            let price = priceByType;
            if (type == 'custom') {
                price = product.soloPrice;
                if (products.length > 1) {
                    price = product.manyPrice;
                }
            }
            return {
                ...product,
                realPrice: (0, number_1.roundNumber)(price, 2),
            };
        });
        const totalPrice = type == 'custom'
            ? (0, number_1.roundNumber)(productPrices.reduce((acc, product) => acc + product.realPrice, 0), 2)
            : this.getPriceByType(type);
        return {
            totalPrice,
            products: productPrices,
        };
    }
    getPriceByType(type) {
        switch (type) {
            case 'essentiel':
                return 11.9;
            case 'liberte':
                return 19.9;
            case 'securite':
                return 24.9;
            default:
                return 0;
        }
    }
};
exports.ToolsService = ToolsService;
exports.ToolsService = ToolsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], ToolsService);
//# sourceMappingURL=tools.service.js.map
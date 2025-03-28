"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let FileValidationPipe = class FileValidationPipe {
    constructor() {
        this.authorizedMimetype = ['jpeg', 'png', 'pdf'];
    }
    async transform(files) {
        for (const file of files) {
            if (file.size > 20_000_000) {
                throw new common_1.HttpException('Fichier trop volumineux', common_1.HttpStatus.PAYLOAD_TOO_LARGE);
            }
            const signature = [...file.buffer]
                .slice(0, 4)
                .map((b) => b.toString(16))
                .join('')
                .toUpperCase();
            if (!this.authorizedMimetype.includes(getMimetype(signature))) {
                throw new common_1.HttpException('Fichier non autorisé', common_1.HttpStatus.METHOD_NOT_ALLOWED);
            }
        }
        return files;
    }
};
exports.FileValidationPipe = FileValidationPipe;
exports.FileValidationPipe = FileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileValidationPipe);
function getMimetype(signature) {
    switch (signature) {
        case '89504E47':
            return 'png';
        case '47494638':
            return 'gif';
        case '25504446':
            return 'pdf';
        case 'FFD8FFDB':
        case 'FFD8FFE0':
        case 'FFD8FFE1':
        case 'FFD8FFEE':
            return 'jpeg';
        case '504B0304':
            return 'zip';
        default:
            return null;
    }
}
//# sourceMappingURL=files.validation.js.map
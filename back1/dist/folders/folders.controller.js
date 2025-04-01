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
exports.FoldersController = void 0;
const common_1 = require("@nestjs/common");
const folders_service_1 = require("./folders.service");
const guard_1 = require("../guard");
const constants_1 = require("../constants");
const guard_2 = require("../guard");
let FoldersController = class FoldersController {
    constructor(foldersService) {
        this.foldersService = foldersService;
    }
    create(auth, data) {
        return this.foldersService.create(auth, data);
    }
    findAll(auth) {
        return this.foldersService.findAll(auth);
    }
    update(auth, id, body) {
        return this.foldersService.addDocument(auth, id, body);
    }
    completeFolder(auth, id) {
        return this.foldersService.completeFolder(auth, id);
    }
    updateStatus(auth, id, body) {
        return this.foldersService.updateStatus(auth, id, body.status);
    }
    updateNumMPR(auth, id, body) {
        return this.foldersService.updateNumMPR(auth, id, body.numMPR);
    }
    remove(auth, id) {
        return this.foldersService.remove(auth, id);
    }
    async generatePdf(auth, id, res) {
        try {
            const pdfBuffer = await this.foldersService.generatePdf(auth, id);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="synthese-${id}.pdf"`,
                'Cache-Control': 'no-cache'
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).json({ message: 'Error generating PDF' });
        }
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, guard_1.Auth)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "completeFolder", null);
__decorate([
    (0, constants_1.Admin)(),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "updateStatus", null);
__decorate([
    (0, constants_1.Admin)(),
    (0, common_1.Patch)(':id/num-mpr'),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "updateNumMPR", null);
__decorate([
    (0, constants_1.Admin)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FoldersController.prototype, "generatePdf", null);
exports.FoldersController = FoldersController = __decorate([
    (0, common_1.UseGuards)(guard_2.AuthGuard),
    (0, common_1.Controller)('folders'),
    __metadata("design:paramtypes", [folders_service_1.FoldersService])
], FoldersController);
//# sourceMappingURL=folders.controller.js.map
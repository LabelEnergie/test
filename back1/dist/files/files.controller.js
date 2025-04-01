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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
const guard_1 = require("../guard");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    getFile(params, res) {
        return this.filesService.getFile(params, res);
    }
    getStaticFile(params, res) {
        return this.filesService.getFile(params, res, { isStatic: true });
    }
    getBlogFile({ name, code }, res) {
        return this.filesService.getFile({ name }, res, {
            isBlog: true,
            suppFolders: code,
        });
    }
    async uploadFile(auth, files) {
        return await this.filesService.uploadFile(auth, files);
    }
    async uploadBlogFile(auth, files, res, code) {
        const result = this.filesService.uploadFile(auth, files, {
            blogArticleCode: code,
        });
        res.statusCode = 200;
        res.json(result);
    }
    async deleteFile(body) {
        return await this.filesService.deleteFile(body);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, constants_2.Public)(),
    (0, common_1.Get)('/:id/:name'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getFile", null);
__decorate([
    (0, constants_2.Public)(),
    (0, common_1.Get)('/:name'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getStaticFile", null);
__decorate([
    (0, constants_2.Public)(),
    (0, common_1.Get)('/blog/:code/:name'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getBlogFile", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, guard_1.Auth)('auth')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, constants_1.Admin)(),
    (0, common_1.Post)('upload/article/:code'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, guard_1.Auth)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object, String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadBlogFile", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deleteFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    (0, common_1.UseGuards)(guard_1.AuthGuard),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map
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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
let FilesService = class FilesService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async uploadFile(auth, files, options) {
        try {
            const result = [];
            for (const file of files) {
                const originalName = file.originalname.split('.');
                const ext = originalName[originalName.length - 1];
                const fileName = `${options?.blogArticleCode ?? auth.id}/${Date.now()}.${ext}`;
                const bucket = this.firebaseService.storage.bucket();
                const fileBuffer = file.buffer;
                const fileUpload = bucket.file(fileName);
                await fileUpload.save(fileBuffer, {
                    contentType: file.mimetype,
                });
                const [url] = await fileUpload.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500',
                });
                result.push(url);
            }
            return result;
        }
        catch (e) {
            console.error(e);
            throw new common_1.HttpException("Erreur pendant l'upload de fichiers", 500);
        }
    }
    async getFile(params, res, options) {
        try {
            const path = options?.isStatic
                ? `statics/${params.name}`
                : options?.isBlog
                    ? `blog/${options?.suppFolders}/${params.name}`
                    : `users/${params.id}/${params.name}`;
            const bucket = this.firebaseService.storage.bucket();
            const file = bucket.file(path);
            const [exists] = await file.exists();
            if (!exists) {
                res.status(404).send('File not found');
                return;
            }
            const [metadata] = await file.getMetadata();
            res.setHeader('Content-Type', metadata.contentType);
            const stream = file.createReadStream();
            stream.pipe(res);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving file');
        }
    }
    async deleteFile(body) {
        if (!body?.names) {
            throw new common_1.HttpException('Mauvaise requête', 403);
        }
        const bucket = this.firebaseService.storage.bucket();
        await Promise.all(body.names.map(async (name) => {
            try {
                await bucket.file(name).delete();
            }
            catch (error) {
                console.error(`Error deleting file ${name}:`, error);
            }
        }));
    }
    async deleteAllUserFile(auth) {
        try {
            const bucket = this.firebaseService.storage.bucket();
            const [files] = await bucket.getFiles({
                prefix: `users/${auth.id}/`
            });
            await Promise.all(files.map(file => file.delete()));
        }
        catch (error) {
            console.error('Error deleting user files:', error);
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FilesService);
//# sourceMappingURL=files.service.js.map
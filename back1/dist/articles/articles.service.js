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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const image_1 = require("../utils/image");
const error_1 = require("../utils/error");
const firebase_service_1 = require("../firebase/firebase.service");
let ArticlesService = class ArticlesService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async create(auth, body) {
        try {
            const existingDoc = await this.firebaseService.firestore
                .collection('articles')
                .where('code', '==', body.code)
                .get();
            if (!existingDoc.empty) {
                (0, error_1.throwError)(`Le code ${body.code} existe déjà`, common_1.HttpStatus.CONFLICT);
            }
            const article = {
                ...body,
                lastDate: new Date(),
                image: {
                    src: (0, image_1.getBlogFilePath)(body.code, body.imageName),
                    legend: body.title
                },
                mdFileUrl: (0, image_1.getBlogFilePath)(body.code, body.mdFileName),
                images: body.images?.map(img => ({
                    src: (0, image_1.getBlogFilePath)(body.code, img.name),
                    legend: img.legend
                }))
            };
            const docRef = await this.firebaseService.firestore
                .collection('articles')
                .add(article);
            return this.findAll();
        }
        catch (error) {
            (0, error_1.throwError)("Erreur lors de la création de l'article", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        const snapshot = await this.firebaseService.firestore
            .collection('articles')
            .get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            code: doc.data().code,
            title: doc.data().title,
            image: doc.data().image
        }));
    }
    async findOne(code) {
        const snapshot = await this.firebaseService.firestore
            .collection('articles')
            .where('code', '==', code)
            .get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data()
        };
    }
    async update(auth, id, body) {
        try {
            const article = {
                ...body,
                lastDate: new Date(),
                image: {
                    src: (0, image_1.getBlogFilePath)(body.code, body.imageName),
                    legend: body.title
                },
                mdFileUrl: (0, image_1.getBlogFilePath)(body.code, body.mdFileName),
                images: body.images?.map(img => ({
                    src: (0, image_1.getBlogFilePath)(body.code, img.name),
                    legend: img.legend
                }))
            };
            await this.firebaseService.firestore
                .collection('articles')
                .doc(id)
                .update(article);
            return this.findAll();
        }
        catch (error) {
            (0, error_1.throwError)("Erreur lors de la mise à jour de l'article", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(auth, id) {
        try {
            await this.firebaseService.firestore
                .collection('articles')
                .doc(id)
                .delete();
        }
        catch (error) {
            (0, error_1.throwError)("Erreur lors de la suppression de l'article", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map
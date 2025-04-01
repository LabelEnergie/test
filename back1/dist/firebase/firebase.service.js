"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const constants_1 = require("../constants");
let FirebaseService = class FirebaseService {
    onModuleInit() {
        if (!admin.apps.length) {
            const firebaseConfig = (0, constants_1.ENV)().FIREBASE;
            if (!firebaseConfig.PROJECT_ID || !firebaseConfig.CLIENT_EMAIL || !firebaseConfig.PRIVATE_KEY) {
                throw new Error('Firebase credentials are missing. Required: PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY');
            }
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: firebaseConfig.PROJECT_ID,
                    clientEmail: firebaseConfig.CLIENT_EMAIL,
                    privateKey: firebaseConfig.PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
                storageBucket: firebaseConfig.STORAGE_BUCKET,
            });
        }
        this.firestore = admin.firestore();
        this.auth = admin.auth();
        this.storage = admin.storage();
        this.bucket = this.storage.bucket();
    }
    async getCollection(collectionName) {
        const snapshot = await this.firestore.collection(collectionName).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async getDocument(collectionName, docId) {
        const doc = await this.firestore.collection(collectionName).doc(docId).get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async createDocument(collectionName, data) {
        const docRef = this.firestore.collection(collectionName).doc(data.id);
        await docRef.set(data);
        const newDoc = await docRef.get();
        return { id: newDoc.id, ...newDoc.data() };
    }
    async updateDocument(collectionName, docId, data) {
        await this.firestore.collection(collectionName).doc(docId).update(data);
    }
    async deleteDocument(collectionName, docId) {
        await this.firestore.collection(collectionName).doc(docId).delete();
    }
    async query(collectionName, fieldPath, opStr, value) {
        const snapshot = await this.firestore
            .collection(collectionName)
            .where(fieldPath, opStr, value)
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async uploadFile(filePath, fileBuffer, contentType, userId) {
        const file = this.bucket.file(filePath);
        await file.save(fileBuffer, {
            metadata: {
                contentType,
                metadata: {
                    userId,
                    uploadedAt: new Date().toISOString()
                }
            }
        });
    }
    async getFileUrl(filePath) {
        const [url] = await this.bucket.file(filePath).getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });
        return url;
    }
    async deleteFile(filePath) {
        await this.bucket.file(filePath).delete();
    }
    async fileExists(filePath) {
        const [exists] = await this.bucket.file(filePath).exists();
        return exists;
    }
    async verifyToken(token) {
        return this.auth.verifyIdToken(token);
    }
    async getUser(uid) {
        return this.auth.getUser(uid);
    }
    async getPublicUrl(filePath) {
        return `https://storage.googleapis.com/${this.bucket.name}/${filePath}`;
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)()
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map
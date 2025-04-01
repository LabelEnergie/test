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
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const constants_1 = require("../constants");
let FirebaseService = class FirebaseService {
    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: (0, constants_1.ENV)().FIREBASE.PROJECT_ID,
                    clientEmail: (0, constants_1.ENV)().FIREBASE.CLIENT_EMAIL,
                    privateKey: (0, constants_1.ENV)().FIREBASE.PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
                storageBucket: (0, constants_1.ENV)().FIREBASE.STORAGE_BUCKET
            });
        }
        this.auth = admin.auth();
        this.firestore = admin.firestore();
        this.storage = admin.storage();
    }
    async getCollection(collectionName) {
        const snapshot = await this.firestore.collection(collectionName).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async getDocument(collectionName, docId) {
        console.log(`Attempting to fetch document from ${collectionName} with ID:`, docId);
        const docRef = this.firestore.collection(collectionName).doc(docId);
        console.log('Document reference:', docRef.path);
        const doc = await docRef.get();
        console.log('Document exists:', doc.exists);
        if (doc.exists) {
            console.log('Document data:', doc.data());
        }
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async createDocument(collectionName, data) {
        console.log('Creating document in collection:', collectionName);
        console.log('Data to save:', JSON.stringify(data, null, 2));
        try {
            const docRef = this.firestore.collection(collectionName).doc(data.id);
            await docRef.set(data);
            console.log('Document created with ID:', data.id);
            const newDoc = await docRef.get();
            console.log('Document creation verified:', newDoc.exists);
            if (newDoc.exists) {
                console.log('Saved data:', newDoc.data());
            }
            return { id: newDoc.id, ...newDoc.data() };
        }
        catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
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
    async verifyToken(token) {
        return this.auth.verifyIdToken(token);
    }
    async getUser(uid) {
        return this.auth.getUser(uid);
    }
    async onModuleInit() {
        console.log('FirebaseService initialized');
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map
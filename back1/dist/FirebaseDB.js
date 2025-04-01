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
exports.FirebaseDB = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase/firebase.service");
const error_1 = require("./utils/error");
let FirebaseDB = class FirebaseDB {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async query(collectionName, conditions, limit, orderBy) {
        try {
            let query = this.firebaseService.firestore.collection(collectionName);
            if (conditions && conditions.length > 0) {
                conditions.forEach(condition => {
                    query = query.where(condition.field, condition.operator, condition.value);
                });
            }
            if (orderBy) {
                query = query.orderBy(orderBy.field, orderBy.direction);
            }
            if (limit) {
                query = query.limit(limit);
            }
            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        catch (e) {
            console.error(e);
            (0, error_1.throwError)(e.message, 500);
            return null;
        }
    }
    async getById(collectionName, id) {
        try {
            const doc = await this.firebaseService.firestore
                .collection(collectionName)
                .doc(id)
                .get();
            if (!doc.exists)
                return null;
            return { id: doc.id, ...doc.data() };
        }
        catch (e) {
            console.error(e);
            (0, error_1.throwError)(e.message, 500);
            return null;
        }
    }
    async create(collectionName, data) {
        try {
            const docRef = await this.firebaseService.firestore
                .collection(collectionName)
                .add(data);
            const newDoc = await docRef.get();
            return { id: newDoc.id, ...newDoc.data() };
        }
        catch (e) {
            console.error(e);
            (0, error_1.throwError)(e.message, 500);
            return null;
        }
    }
    async update(collectionName, id, data) {
        try {
            await this.firebaseService.firestore
                .collection(collectionName)
                .doc(id)
                .update(data);
        }
        catch (e) {
            console.error(e);
            (0, error_1.throwError)(e.message, 500);
        }
    }
    async delete(collectionName, id) {
        try {
            await this.firebaseService.firestore
                .collection(collectionName)
                .doc(id)
                .delete();
        }
        catch (e) {
            console.error(e);
            (0, error_1.throwError)(e.message, 500);
        }
    }
};
exports.FirebaseDB = FirebaseDB;
exports.FirebaseDB = FirebaseDB = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseDB);
//# sourceMappingURL=FirebaseDB.js.map
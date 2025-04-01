import { OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
export declare class FirebaseService implements OnModuleInit {
    firestore: admin.firestore.Firestore;
    auth: admin.auth.Auth;
    storage: admin.storage.Storage;
    constructor();
    getCollection<T>(collectionName: string): Promise<T[]>;
    getDocument<T>(collectionName: string, docId: string): Promise<T | null>;
    createDocument<T>(collectionName: string, data: T): Promise<T>;
    updateDocument<T>(collectionName: string, docId: string, data: Partial<T>): Promise<void>;
    deleteDocument(collectionName: string, docId: string): Promise<void>;
    query<T>(collectionName: string, fieldPath: string, opStr: admin.firestore.WhereFilterOp, value: any): Promise<T[]>;
    verifyToken(token: string): Promise<import("firebase-admin/lib/auth/token-verifier").DecodedIdToken>;
    getUser(uid: string): Promise<import("firebase-admin/lib/auth/user-record").UserRecord>;
    onModuleInit(): Promise<void>;
}

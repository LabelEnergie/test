import { OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
export declare class FirebaseService implements OnModuleInit {
    firestore: admin.firestore.Firestore;
    auth: admin.auth.Auth;
    storage: admin.storage.Storage;
    private bucket;
    onModuleInit(): void;
    getCollection<T>(collectionName: string): Promise<T[]>;
    getDocument<T>(collectionName: string, docId: string): Promise<T | null>;
    createDocument<T>(collectionName: string, data: T): Promise<T>;
    updateDocument<T>(collectionName: string, docId: string, data: Partial<T>): Promise<void>;
    deleteDocument(collectionName: string, docId: string): Promise<void>;
    query<T>(collectionName: string, fieldPath: string, opStr: admin.firestore.WhereFilterOp, value: any): Promise<T[]>;
    uploadFile(filePath: string, fileBuffer: Buffer, contentType: string, userId: string): Promise<void>;
    getFileUrl(filePath: string): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    fileExists(filePath: string): Promise<boolean>;
    verifyToken(token: string): Promise<import("firebase-admin/lib/auth/token-verifier").DecodedIdToken>;
    getUser(uid: string): Promise<import("firebase-admin/lib/auth/user-record").UserRecord>;
    getPublicUrl(filePath: string): Promise<string>;
}

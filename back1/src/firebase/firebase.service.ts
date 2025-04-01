import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { ENV } from '../constants';
import { Readable } from 'stream';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public firestore: admin.firestore.Firestore;
  public auth: admin.auth.Auth;
  public storage: admin.storage.Storage;
  private bucket: Bucket;

  onModuleInit() {
    if (!admin.apps.length) {
      const firebaseConfig = ENV().FIREBASE;
      
      // Vérification des credentials requis
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

  // ============ Firestore Methods ============
  async getCollection<T>(collectionName: string): Promise<T[]> {
    const snapshot = await this.firestore.collection(collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as T));
  }

  async getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
    const doc = await this.firestore.collection(collectionName).doc(docId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as unknown as T;
  }

  async createDocument<T>(collectionName: string, data: T): Promise<T> {
    const docRef = this.firestore.collection(collectionName).doc((data as any).id);
    await docRef.set(data);
    const newDoc = await docRef.get();
    return { id: newDoc.id, ...newDoc.data() } as T;
  }

  async updateDocument<T>(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
    await this.firestore.collection(collectionName).doc(docId).update(data);
  }

  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    await this.firestore.collection(collectionName).doc(docId).delete();
  }

  async query<T>(
    collectionName: string, 
    fieldPath: string, 
    opStr: admin.firestore.WhereFilterOp, 
    value: any
  ): Promise<T[]> {
    const snapshot = await this.firestore
      .collection(collectionName)
      .where(fieldPath, opStr, value)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as T));
  }

  // ============ Storage Methods ============
  // async uploadFile(filePath: string, fileBuffer: Buffer, contentType: string): Promise<void> {
  //   const file = this.bucket.file(filePath);
  //   const stream = file.createWriteStream({
  //     metadata: {
  //       contentType,
  //     },
  //     resumable: false,
  //   });

  //   return new Promise((resolve, reject) => {
  //     const readable = new Readable();
  //     readable.push(fileBuffer);
  //     readable.push(null);
      
  //     readable.pipe(stream)
  //       .on('error', (error) => reject(error))
  //       .on('finish', () => resolve());
  //   });
  // }
  async uploadFile(filePath: string, fileBuffer: Buffer, contentType: string, userId: string): Promise<void> {
    const file = this.bucket.file(filePath);
    
    await file.save(fileBuffer, {
      metadata: {
        contentType,
        metadata: {
          userId, // Essential pour les règles de sécurité
          uploadedAt: new Date().toISOString()
        }
      }
    });
  }

  async getFileUrl(filePath: string): Promise<string> {
    const [url] = await this.bucket.file(filePath).getSignedUrl({
      action: 'read',
      expires: '03-09-2491', // Date très lointaine
    });
    return url;
  }

  async deleteFile(filePath: string): Promise<void> {
    await this.bucket.file(filePath).delete();
  }

  async fileExists(filePath: string): Promise<boolean> {
    const [exists] = await this.bucket.file(filePath).exists();
    return exists;
  }

  // ============ Auth Methods ============
  async verifyToken(token: string) {
    return this.auth.verifyIdToken(token);
  }

  async getUser(uid: string) {
    return this.auth.getUser(uid);
  }

  // ============ Helper Methods ============
  async getPublicUrl(filePath: string): Promise<string> {
    return `https://storage.googleapis.com/${this.bucket.name}/${filePath}`;
  }
  // async uploadFile(filePath: string, fileBuffer: Buffer, contentType: string): Promise<void> {
  //   try {
  //     if (!this.storage) {
  //       throw new Error('Firebase Storage not initialized');
  //     }
  
  //     const bucket = this.storage.bucket();
  //     if (!bucket) {
  //       throw new Error('Storage bucket not configured');
  //     }
  
  //     const file = bucket.file(filePath);
      
  //     await new Promise((resolve, reject) => {
  //       const stream = file.createWriteStream({
  //         metadata: {
  //           contentType: contentType,
  //         },
  //         resumable: false
  //       });
  
  //       stream.on('error', (error) => {
  //         console.error('Upload stream error:', error);
  //         reject(new Error('Failed to upload file'));
  //       });
  
  //       stream.on('finish', () => {
  //         console.log(`File uploaded to ${filePath}`);
  //         resolve(true);
  //       });
  
  //       stream.end(fileBuffer);
  //     });
  //   } catch (error) {
  //     console.error('Upload error details:', {
  //       error: error.message,
  //       filePath,
  //       bufferSize: fileBuffer?.length,
  //       contentType
  //     });
  //     throw new Error(`Failed to upload PDF to Firebase: ${error.message}`);
  //   }
  // }
}
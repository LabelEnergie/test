import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ENV } from '../constants';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public firestore: admin.firestore.Firestore;
  public auth: admin.auth.Auth;
  public storage: admin.storage.Storage;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: ENV().FIREBASE.PROJECT_ID,
          clientEmail: ENV().FIREBASE.CLIENT_EMAIL,
          privateKey: ENV().FIREBASE.PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        storageBucket: ENV().FIREBASE.STORAGE_BUCKET
      });
    }
    
    this.auth = admin.auth();
    this.firestore = admin.firestore();
    this.storage = admin.storage();
  }

  // Méthodes utilitaires pour Firestore
  async getCollection<T>(collectionName: string): Promise<T[]> {
    const snapshot = await this.firestore.collection(collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as T));
  }

  async getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
    console.log(`Attempting to fetch document from ${collectionName} with ID:`, docId);
    const docRef = this.firestore.collection(collectionName).doc(docId);
    console.log('Document reference:', docRef.path);
    
    const doc = await docRef.get();
    console.log('Document exists:', doc.exists);
    if (doc.exists) {
      console.log('Document data:', doc.data());
    }
    
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as unknown as T;
  }

  async createDocument<T>(collectionName: string, data: T): Promise<T> {
    console.log('Creating document in collection:', collectionName);
    console.log('Data to save:', JSON.stringify(data, null, 2));
    
    try {
      const docRef = this.firestore.collection(collectionName).doc((data as any).id);
      await docRef.set(data);
      console.log('Document created with ID:', (data as any).id);
      
      const newDoc = await docRef.get();
      console.log('Document creation verified:', newDoc.exists);
      if (newDoc.exists) {
        console.log('Saved data:', newDoc.data());
      }
      
      return { id: newDoc.id, ...newDoc.data() } as T;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
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

  // Méthodes pour Firebase Auth
  async verifyToken(token: string) {
    return this.auth.verifyIdToken(token);
  }

  async getUser(uid: string) {
    return this.auth.getUser(uid);
  }

  // Add this method to implement OnModuleInit
  async onModuleInit() {
    console.log('FirebaseService initialized');
    // You can add any initialization logic here if needed
  }
}
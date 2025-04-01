import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { throwError } from './utils/error';
import { CollectionReference, Query, DocumentData } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseDB {
  constructor(private readonly firebaseService: FirebaseService) {}

  async query<T>(
    collectionName: string,
    conditions?: { field: string; operator: string; value: any }[],
    limit?: number,
    orderBy?: { field: string; direction: 'asc' | 'desc' }
  ): Promise<T[] | null> {
    try {
      // Déclarer comme Query au lieu de CollectionReference
      let query: Query<DocumentData> = this.firebaseService.firestore.collection(collectionName);
      
      // Appliquer les conditions
      if (conditions && conditions.length > 0) {
        conditions.forEach(condition => {
          query = query.where(condition.field, condition.operator as any, condition.value);
        });
      }
      
      // Appliquer le tri
      if (orderBy) {
        query = query.orderBy(orderBy.field, orderBy.direction);
      }
      
      // Appliquer la limite
      if (limit) {
        query = query.limit(limit);
      }
      
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as T));
    } catch (e) {
      console.error(e);
      throwError(e.message, 500);
      return null;
    }
  }

  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const doc = await this.firebaseService.firestore
        .collection(collectionName)
        .doc(id)
        .get();
      
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() } as unknown as T;
    } catch (e) {
      console.error(e);
      throwError(e.message, 500);
      return null;
    }
  }

  async create<T>(collectionName: string, data: Omit<T, 'id'>): Promise<T> {
    try {
      const docRef = await this.firebaseService.firestore
        .collection(collectionName)
        .add(data);
      
      const newDoc = await docRef.get();
      return { id: newDoc.id, ...newDoc.data() } as unknown as T;
    } catch (e) {
      console.error(e);
      throwError(e.message, 500);
      return null;
    }
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    try {
      await this.firebaseService.firestore
        .collection(collectionName)
        .doc(id)
        .update(data);
    } catch (e) {
      console.error(e);
      throwError(e.message, 500);
    }
  }

  async delete(collectionName: string, id: string): Promise<void> {
    try {
      await this.firebaseService.firestore
        .collection(collectionName)
        .doc(id)
        .delete();
    } catch (e) {
      console.error(e);
      throwError(e.message, 500);
    }
  }
}
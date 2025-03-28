import { FirebaseService } from './firebase/firebase.service';
export declare class FirebaseDB {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    query<T>(collectionName: string, conditions?: {
        field: string;
        operator: string;
        value: any;
    }[], limit?: number, orderBy?: {
        field: string;
        direction: 'asc' | 'desc';
    }): Promise<T[] | null>;
    getById<T>(collectionName: string, id: string): Promise<T | null>;
    create<T>(collectionName: string, data: Omit<T, 'id'>): Promise<T>;
    update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void>;
    delete(collectionName: string, id: string): Promise<void>;
}

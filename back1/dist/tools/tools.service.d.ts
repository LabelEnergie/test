import { FirebaseService } from '../firebase/firebase.service';
import { TProduct } from 'src/maintenance/maintenance.type';
export declare class ToolsService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    getProducts(productIds: number[]): Promise<any[]>;
    formatRowsToProducts(rows: any[]): TProduct[];
    getCustomContractPrice(type: string, productIds: number[]): Promise<{
        totalPrice: number;
        products: TProduct[];
    }>;
    private getPriceByType;
}

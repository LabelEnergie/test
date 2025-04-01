import { TGenerateContractBody, TProduct, TStoreSignedContractBody, Maintenance, CreateMaintenanceDto } from './maintenance.type';
import { ToolsService } from 'src/tools/tools.service';
import { TAuth } from 'src/auth/auth.types';
import { FirebaseService } from '../firebase/firebase.service';
export declare class MaintenanceService {
    private readonly firebaseService;
    private readonly toolsService;
    constructor(firebaseService: FirebaseService, toolsService: ToolsService);
    findAll(userId: string): Promise<Maintenance[]>;
    findOne(userId: string, id: string): Promise<Maintenance>;
    create(userId: string, data: CreateMaintenanceDto): Promise<Maintenance>;
    storeSignedContractLegacy(userId: string, id: string, signedContractUrl: string): Promise<Maintenance>;
    storeSignedContract(auth: TAuth, body: TStoreSignedContractBody): Promise<Maintenance>;
    getForm(type: string, productsStr?: string): Promise<{
        tree: import("./maintenance.type").TMaintenanceTree[];
        totalPrice: number;
        products: TProduct[];
        type: {
            type: string;
            label: string;
        };
    }>;
    generateJWTForDocusign(): Promise<string>;
    formatRowsToProducts(rows: any[]): TProduct[];
    private getTypeByString;
    generateContract(auth: TAuth, body: TGenerateContractBody): Promise<{
        docUrl: Promise<string>;
        docBase64: string;
    }>;
    sendContractForSignature(auth: TAuth, contractData: any): Promise<any>;
}

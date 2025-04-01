import { MaintenanceService } from './maintenance.service';
import { TAuth } from 'src/auth/auth.types';
import { TStoreSignedContractBody, Maintenance, CreateMaintenanceDto } from './maintenance.type';
export declare class MaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    getForm(type: string, products?: string): Promise<{
        tree: import("./maintenance.type").TMaintenanceTree[];
        totalPrice: number;
        products: import("./maintenance.type").TProduct[];
        type: {
            type: string;
            label: string;
        };
    }>;
    createMaintenance(auth: TAuth, data: CreateMaintenanceDto): Promise<Maintenance>;
    storeSignedContract(auth: TAuth, id: string, body: TStoreSignedContractBody): Promise<Maintenance>;
}

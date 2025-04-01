export interface Maintenance {
    id: string;
    userId: string;
    createdAt: Date;
    type: 'essentiel' | 'liberte' | 'securite' | 'custom';
    products: TProduct[];
    currentForm: any;
    contract?: {
        url: string;
        signedUrl?: string;
        envelopeId?: string;
    };
    status: MaintenanceStatus;
}
export type TProduct = {
    id: string;
    name: string;
    soloPrice: number;
    manyPrice: number;
    realPrice?: number;
    image: string;
};
export type TMaintenanceTree = {
    title: string;
    subtitle?: string;
    items: {
        id: string;
        title?: string;
        placeholder?: string;
        type: 'input' | 'select' | 'input-address' | 'input-date' | 'input-contract' | 'input-payment';
        notRequired?: boolean;
        values?: {
            title: string;
            id: string;
        }[];
    }[];
    hideButton?: boolean;
    dependencies?: Record<string, Record<string, {
        type: string;
        ifValue: string;
    }>>;
};
export type TGenerateContractBody = {
    type: 'essentiel' | 'liberte' | 'securite' | 'custom';
    productIds: number[];
    currentForm: any;
};
export type TStoreSignedContractBody = {
    envelopeId: string;
};
export declare enum MaintenanceStatus {
    PENDING = "pending",
    SIGNED = "signed",
    COMPLETED = "completed"
}
export type CreateMaintenanceDto = Omit<Maintenance, 'id' | 'userId' | 'createdAt' | 'status'>;

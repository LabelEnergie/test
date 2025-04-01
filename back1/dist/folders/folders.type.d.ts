import { TAuth } from 'src/auth/auth.types';
export type TFolder = {
    id: string;
    name: string;
    numMPR?: string;
    date: Date;
    userId: string;
    simulationId: string;
    status: {
        id: FolderType;
        color: string;
        label: string;
    };
    products: {
        id: number;
        title: string;
    }[];
    documents: {
        name: string;
        url: string;
        iconUrl: string;
        type: FolderDocumentType;
    }[];
    user?: TAuth;
    pdfLink: string;
};
export declare enum FolderType {
    Pending = 1,
    Done = 2,
    Completed = 3,
    Canceled = 99
}
export declare enum FolderDocumentType {
    Identity = 1,
    Taxes = 2,
    PropertyTax = 3,
    Home = 4,
    Other = 5
}
export type TFolderBody = {
    productIds: number[];
    simulationId: string;
};
export type TFolderAddDocumentsBody = {
    files: {
        name: string;
        type: FolderDocumentType;
    }[];
};
export type TFolderUpdateStatusBody = {
    status: FolderType;
};
export type TFolderUpdateNumMPRBody = {
    numMPR: string;
};

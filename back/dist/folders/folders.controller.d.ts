import { FoldersService } from './folders.service';
import { TFolder, TFolderAddDocumentsBody, TFolderUpdateNumMPRBody, TFolderUpdateStatusBody } from './folders.type';
import { TAuth } from 'src/auth/auth.types';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    findAll(auth: TAuth): Promise<TFolder[]>;
    create(auth: TAuth, data: Partial<TFolder>): Promise<TFolder[]>;
    addDocuments(auth: TAuth, id: string, body: TFolderAddDocumentsBody): Promise<TFolder[]>;
    completeFolder(auth: TAuth, id: string): Promise<TFolder[]>;
    generatePdf(auth: TAuth, id: string): Promise<{
        pdfUrl: string;
    }>;
    updateStatus(auth: TAuth, id: string, body: TFolderUpdateStatusBody): Promise<TFolder[]>;
    updateNumMPR(auth: TAuth, id: string, body: TFolderUpdateNumMPRBody): Promise<TFolder[]>;
    remove(auth: TAuth, id: string): Promise<TFolder[]>;
}

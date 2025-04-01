import { FoldersService } from './folders.service';
import { TFolderAddDocumentsBody, TFolderUpdateNumMPRBody, TFolderUpdateStatusBody, TFolder } from './folders.type';
import { TAuth } from 'src/auth/auth.types';
import { Response } from 'express';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    create(auth: TAuth, data: Partial<TFolder>): Promise<TFolder[]>;
    findAll(auth: TAuth): Promise<TFolder[]>;
    update(auth: TAuth, id: string, body: TFolderAddDocumentsBody): Promise<TFolder[]>;
    completeFolder(auth: TAuth, id: string): Promise<TFolder[]>;
    updateStatus(auth: TAuth, id: string, body: TFolderUpdateStatusBody): Promise<TFolder[]>;
    updateNumMPR(auth: TAuth, id: string, body: TFolderUpdateNumMPRBody): Promise<TFolder[]>;
    remove(auth: TAuth, id: string): Promise<TFolder[]>;
    generatePdf(auth: TAuth, id: string, res: Response): Promise<void>;
}

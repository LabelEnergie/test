import { TAuth } from 'src/auth/auth.types';
import { FolderType, TFolder, TFolderAddDocumentsBody } from './folders.type';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SimulatorService } from 'src/simulator/simulator.service';
import { PdfService } from '../pdf/pdf.service';
export declare class FoldersService {
    private readonly firebaseService;
    private readonly simulatorService;
    private readonly pdfService;
    constructor(firebaseService: FirebaseService, simulatorService: SimulatorService, pdfService: PdfService);
    create(auth: TAuth, data: Partial<TFolder>): Promise<TFolder[]>;
    findAll(auth: TAuth): Promise<TFolder[]>;
    getFolder(auth: TAuth, id: string): Promise<TFolder>;
    addDocument(auth: TAuth, id: string, { files }: TFolderAddDocumentsBody): Promise<TFolder[]>;
    completeFolder(auth: TAuth, id: string): Promise<TFolder[]>;
    updateStatus(auth: TAuth, id: string, status: FolderType): Promise<TFolder[]>;
    updateNumMPR(auth: TAuth, id: string, numMPR: string): Promise<TFolder[]>;
    updatePdfLink(auth: TAuth, id: string, pdfLink: string): Promise<TFolder[]>;
    private getStatusColor;
    private getStatusLabel;
    remove(auth: TAuth, id: string): Promise<TFolder[]>;
    generatePdf(auth: TAuth, id: string): Promise<string>;
    private generatePdfContent;
    private parseSurface;
    deleteOldPdfs(folderId: string, keepLastN?: number): Promise<void>;
}

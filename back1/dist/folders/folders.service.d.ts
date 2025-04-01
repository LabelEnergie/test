import { TAuth } from 'src/auth/auth.types';
import { FolderType, TFolder, TFolderAddDocumentsBody } from './folders.type';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SimulatorService } from 'src/simulator/simulator.service';
export declare class FoldersService {
    private readonly firebaseService;
    private readonly simulatorService;
    constructor(firebaseService: FirebaseService, simulatorService: SimulatorService);
    create(auth: TAuth, data: Partial<TFolder>): Promise<TFolder[]>;
    findAll(auth: TAuth): Promise<TFolder[]>;
    addDocument(auth: TAuth, id: string, { files }: TFolderAddDocumentsBody): Promise<TFolder[]>;
    completeFolder(auth: TAuth, id: string): Promise<TFolder[]>;
    updateStatus(auth: TAuth, id: string, status: FolderType): Promise<TFolder[]>;
    updateNumMPR(auth: TAuth, id: string, numMPR: string): Promise<TFolder[]>;
    private getStatusColor;
    private getStatusLabel;
    remove(auth: TAuth, id: string): Promise<TFolder[]>;
    private extractZipCode;
    generatePdf(auth: TAuth, id: string): Promise<Buffer>;
}

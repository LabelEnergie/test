import { FirebaseService } from '../firebase/firebase.service';
export declare class PdfService {
    private readonly firebaseService;
    private storage;
    constructor(firebaseService: FirebaseService);
    private registerHandlebarsHelpers;
    private getTemplateContent;
    generatePdf(folderId: string, simulationData: any, userId: string): Promise<string>;
    private prepareTemplateData;
    private generateHtml;
    private createPdfBuffer;
    generateTestHtml(data: any): Promise<string>;
}
export declare class SimplePdfService {
    private readonly firebaseService;
    private storage;
    constructor(firebaseService: FirebaseService);
    private registerHandlebarsHelpers;
    generateSimplePdf(folderId: string, content: any, userId: string): Promise<string>;
}

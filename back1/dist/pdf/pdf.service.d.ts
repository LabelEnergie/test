export declare class PdfService {
    constructor();
    generatePdf(fileName: string, data: any, templateName: string): Promise<string>;
}

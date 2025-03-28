import { TAuth } from 'src/auth/auth.types';
export declare function generatePdf(auth: TAuth, { data, hbsFileName, pdfName, }: {
    hbsFileName: string;
    data: any;
    pdfName: string;
}): Promise<string>;

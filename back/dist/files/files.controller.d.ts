import { FilesService } from './files.service';
import { Response } from 'express';
import { TAuth } from 'src/auth/auth.types';
import { UploadedFile } from './files.types';
import type { Multer } from 'multer';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    getFile(params: {
        id: string;
        name: string;
    }, res: Response): Promise<void>;
    getStaticFile(params: {
        name: string;
    }, res: Response): Promise<void>;
    getBlogFile({ name, code }: {
        name: string;
        code: string;
    }, res: Response): Promise<void>;
    uploadFile(auth: TAuth, files: Multer.File[]): Promise<any[]>;
    uploadBlogFile(auth: TAuth, files: Array<UploadedFile>, res: Response, code: string): Promise<void>;
    deleteFile(body: {
        names: string[];
    }): Promise<void>;
}

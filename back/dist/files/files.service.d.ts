import { TAuth } from 'src/auth/auth.types';
import { UploadedFile } from './files.types';
import { FirebaseService } from '../firebase/firebase.service';
import { Response } from 'express';
export declare class FilesService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    uploadFile(auth: TAuth, files: Array<UploadedFile>, options?: {
        blogArticleCode?: string;
    }): Promise<any[]>;
    getFile(params: {
        id?: string;
        name: string;
    }, res: Response, options?: {
        isStatic?: boolean;
        isBlog?: boolean;
        suppFolders?: string;
    }): Promise<void>;
    deleteFile(body: {
        names: string[];
    }): Promise<void>;
    deleteAllUserFile(auth: TAuth): Promise<void>;
}

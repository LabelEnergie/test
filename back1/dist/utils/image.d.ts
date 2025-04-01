import { TAuth } from 'src/auth/auth.types';
export declare function getFirebaseStorageUrl(path: string): Promise<string>;
export declare function getStaticFilePath(name: string): string;
export declare function getUserFilePath(auth: TAuth, name?: string): Promise<string>;
export declare function getBlogFilePath(articleCode: string, fileName: string): Promise<string>;

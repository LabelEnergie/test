import { FolderType } from 'src/folders/folders.type';
export declare function getDataFolderStatus(type: FolderType): {
    id: FolderType.Done;
    color: string;
    label: string;
} | {
    id: FolderType.Pending;
    color: string;
    label: string;
} | {
    id: FolderType.Completed;
    color: string;
    label: string;
} | {
    id: FolderType.Canceled;
    color: string;
    label: string;
};
export declare function getDocumentIcon(name: string): string;

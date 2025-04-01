import { PipeTransform } from '@nestjs/common';
import { UploadedFile } from './files.types';
export declare class FileValidationPipe implements PipeTransform {
    private authorizedMimetype;
    transform(files: UploadedFile[]): Promise<UploadedFile[]>;
}

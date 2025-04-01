import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UploadedFile } from './files.types'; // Déplacé l'import ici

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private authorizedMimetype = ['jpeg', 'png', 'pdf'];

  async transform(files: UploadedFile[]) {
    for (const file of files) {
      if (file.size > 20_000_000) {
        throw new HttpException(
          'Fichier trop volumineux',
          HttpStatus.PAYLOAD_TOO_LARGE,
        );
      }

      const signature = [...file.buffer]
        .slice(0, 4)
        .map((b) => b.toString(16))
        .join('')
        .toUpperCase();

      if (!this.authorizedMimetype.includes(getMimetype(signature))) {
        throw new HttpException(
          'Fichier non autorisé',
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      }
    }
    return files;
  }
}

function getMimetype(signature: string) {
  switch (signature) {
    case '89504E47':
      return 'png';
    case '47494638':
      return 'gif';
    case '25504446':
      return 'pdf';
    case 'FFD8FFDB':
    case 'FFD8FFE0':
    case 'FFD8FFE1':
    case 'FFD8FFEE':
      return 'jpeg';
    case '504B0304':
      return 'zip';
    default:
      return null;
  }
}

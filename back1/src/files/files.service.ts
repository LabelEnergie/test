import { HttpException, Injectable } from '@nestjs/common';
import { TAuth } from 'src/auth/auth.types';
import { ENV } from 'src/constants';
import { UploadedFile } from './files.types';
import { FirebaseService } from '../firebase/firebase.service';
import { Response } from 'express';  // Add this import

@Injectable()
export class FilesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadFile(
    auth: TAuth,
    files: Array<UploadedFile>,
    options?: {
      blogArticleCode?: string;
    },
  ) {
    try {
      const result = [];
      for (const file of files) {
        const originalName = file.originalname.split('.');
        const ext = originalName[originalName.length - 1];
        const fileName = `${options?.blogArticleCode ?? auth.id}/${Date.now()}.${ext}`;

        const bucket = this.firebaseService.storage.bucket();
        const fileBuffer = file.buffer;
        
        const fileUpload = bucket.file(fileName);
        await fileUpload.save(fileBuffer, {
          contentType: file.mimetype,
        });

        const [url] = await fileUpload.getSignedUrl({
          action: 'read',
          expires: '03-01-2500', // Long expiration
        });

        result.push(url);
      }
      return result;
    } catch (e) {
      console.error(e);
      throw new HttpException("Erreur pendant l'upload de fichiers", 500);
    }
  }

  async getFile(
    params: { id?: string; name: string },
    res: Response,  // Now correctly typed as Express.Response
    options?: { isStatic?: boolean; isBlog?: boolean; suppFolders?: string },
  ) {
    try {
      const path = options?.isStatic
        ? `statics/${params.name}`
        : options?.isBlog
        ? `blog/${options?.suppFolders}/${params.name}`
        : `users/${params.id}/${params.name}`;

      const bucket = this.firebaseService.storage.bucket();
      const file = bucket.file(path);
      
      const [exists] = await file.exists();
      if (!exists) {
        res.status(404).send('File not found');
        return;
      }

      const [metadata] = await file.getMetadata();
      res.setHeader('Content-Type', metadata.contentType);
      
      const stream = file.createReadStream();
      stream.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving file');
    }
  }

  async deleteFile(body: { names: string[] }) {
    if (!body?.names) {
      throw new HttpException('Mauvaise requête', 403);
    }

    const bucket = this.firebaseService.storage.bucket();
    
    await Promise.all(
      body.names.map(async (name) => {
        try {
          await bucket.file(name).delete();
        } catch (error) {
          console.error(`Error deleting file ${name}:`, error);
        }
      })
    );
  }

  async deleteAllUserFile(auth: TAuth) {
    try {
      const bucket = this.firebaseService.storage.bucket();
      const [files] = await bucket.getFiles({
        prefix: `users/${auth.id}/`
      });
      
      await Promise.all(
        files.map(file => file.delete())
      );
    } catch (error) {
      console.error('Error deleting user files:', error);
    }
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { TArticle, TArticleBody, TMiniArticle } from './articles.types';
import { TAuth } from 'src/auth/auth.types';
import { getBlogFilePath } from 'src/utils/image';
import { throwError } from 'src/utils/error';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(auth: TAuth, body: TArticleBody) {
    try {
      // Check if code exists
      const existingDoc = await this.firebaseService.firestore
        .collection('articles')
        .where('code', '==', body.code)
        .get();

      if (!existingDoc.empty) {
        throwError(`Le code ${body.code} existe déjà`, HttpStatus.CONFLICT);
      }

      const article = {
        ...body,
        lastDate: new Date(),
        image: {
          src: getBlogFilePath(body.code, body.imageName),
          legend: body.title
        },
        mdFileUrl: getBlogFilePath(body.code, body.mdFileName),
        images: body.images?.map(img => ({
          src: getBlogFilePath(body.code, img.name),
          legend: img.legend
        }))
      };

      const docRef = await this.firebaseService.firestore
        .collection('articles')
        .add(article);

      return this.findAll();
    } catch (error) {
      throwError("Erreur lors de la création de l'article", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<TMiniArticle[]> {
    const snapshot = await this.firebaseService.firestore
      .collection('articles')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      code: doc.data().code,
      title: doc.data().title,
      image: doc.data().image
    }));
  }

  async findOne(code: string): Promise<TArticle | null> {
    const snapshot = await this.firebaseService.firestore
      .collection('articles')
      .where('code', '==', code)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as TArticle;
  }

  async update(auth: TAuth, id: string, body: TArticleBody) {
    try {
      const article = {
        ...body,
        lastDate: new Date(),
        image: {
          src: getBlogFilePath(body.code, body.imageName),
          legend: body.title
        },
        mdFileUrl: getBlogFilePath(body.code, body.mdFileName),
        images: body.images?.map(img => ({
          src: getBlogFilePath(body.code, img.name),
          legend: img.legend
        }))
      };

      await this.firebaseService.firestore
        .collection('articles')
        .doc(id)
        .update(article);

      return this.findAll();
    } catch (error) {
      throwError("Erreur lors de la mise à jour de l'article", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(auth: TAuth, id: string) {
    try {
      await this.firebaseService.firestore
        .collection('articles')
        .doc(id)
        .delete();
    } catch (error) {
      throwError("Erreur lors de la suppression de l'article", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

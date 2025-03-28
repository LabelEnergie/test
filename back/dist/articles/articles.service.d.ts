import { TArticle, TArticleBody, TMiniArticle } from './articles.types';
import { TAuth } from 'src/auth/auth.types';
import { FirebaseService } from '../firebase/firebase.service';
export declare class ArticlesService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    create(auth: TAuth, body: TArticleBody): Promise<TMiniArticle[]>;
    findAll(): Promise<TMiniArticle[]>;
    findOne(code: string): Promise<TArticle | null>;
    update(auth: TAuth, id: string, body: TArticleBody): Promise<TMiniArticle[]>;
    remove(auth: TAuth, id: string): Promise<void>;
}

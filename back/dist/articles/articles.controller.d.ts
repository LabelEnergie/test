import { ArticlesService } from './articles.service';
import { TArticleBody } from './articles.types';
import { TAuth } from 'src/auth/auth.types';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(auth: TAuth, body: TArticleBody): Promise<import("./articles.types").TMiniArticle[]>;
    findAll(): Promise<import("./articles.types").TMiniArticle[]>;
    findOne(code: string): Promise<import("./articles.types").TArticle>;
    update(auth: TAuth, id: string, body: TArticleBody): Promise<import("./articles.types").TMiniArticle[]>;
    remove(auth: TAuth, id: string): Promise<void>;
}

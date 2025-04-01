export interface TArticle extends TMiniArticle {
    lastDate: Date;
    seo: {
        title: string;
        description: string;
    };
    mdFileUrl: string;
    images?: {
        src: string;
        legend: string;
    }[];
}
export type TMiniArticle = {
    id: string;
    code: string;
    title: string;
    image: {
        src: string;
        legend: string;
    };
};
export type TArticleBody = {
    code: string;
    title: string;
    imageName: string;
    seo: {
        title: string;
        description: string;
    };
    mdFileName: string;
    images?: {
        name: string;
        legend: string;
    }[];
};

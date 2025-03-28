export interface TArticleForm
  extends Omit<TArticle, "lastDate" | "id" | "image" | "images" | "mdFileUrl"> {
  image?: {
    file: any;
    legend: string;
  };
  images: {
    file: any;
    legend: string;
  }[];
  mdFile?: any;
}

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
  code: string; // Used for routing
  title: string;
  image: { src: string; legend: string };
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

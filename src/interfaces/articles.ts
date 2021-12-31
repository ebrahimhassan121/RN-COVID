export interface IArticle {
  source: {
    id: string;
    name: string;
  };
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

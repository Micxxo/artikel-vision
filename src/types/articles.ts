export type Articles = {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticleStatus = "publish" | "draft" | "thrash";

export type GetAllArticleParams = {
  limit?: number;
  page?: number;
  status?: ArticleStatus;
};

export type CreateArticlePayloadProps = {
  title: string;
  content: string;
  category: string;
  status: ArticleStatus;
};

export type EditArticlePayloadProps = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: ArticleStatus;
};

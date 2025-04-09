export interface IRequestBlog {
    page?: number;
    limit?: number;
    topicId?: string;
  }
export interface IRequestBlogGrammar {
    page?: number;
    limit?: number;
    grammarPointId?: string;
  }
export interface IBlog {
    data: IBlogData[];
    limit: number;
    page: number;
    pages: number;
    total: number;
}
export interface IBlogData {
    id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}
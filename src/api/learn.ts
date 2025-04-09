import { api } from "@/lib/api";
import {
  IBlog,
  IBlogData,
  IRequestBlog,
  IRequestBlogGrammar,
} from "@/types/LearnType/blog";
import { ITopics } from "@/types/LearnType/topic";

export const getTopic = (): Promise<ITopics[]> => api.get(`/topics`);
export const getGrammar = (): Promise<ITopics[]> => api.get(`/grammar-points`);
export const getBlogTopic = (params: IRequestBlog): Promise<IBlog> =>
  api.get(`/blogs/topic`, {
    params,
  });
export const getBlogGrammar = (params: IRequestBlogGrammar): Promise<IBlog> =>
  api.get(`/blogs/grammar-point`, {
    params,
  });
export const getBlogDetail = (id: string): Promise<IBlogData> =>
  api.get(`/blogs/${id}`);

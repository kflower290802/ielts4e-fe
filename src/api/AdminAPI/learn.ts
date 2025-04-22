import { api } from "@/lib/api";

export const createTopic = (data: {name: string}): Promise<string> =>
    api.post(`/topics/`, data);
export const createGrammar = (data: {name: string}): Promise<string> =>
    api.post(`/grammar-points/`, data);
export const createLearnBlog = (blog: FormData): Promise<string> =>
  api.post("/blogs", blog, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
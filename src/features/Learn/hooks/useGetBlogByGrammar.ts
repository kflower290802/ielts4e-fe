import { getBlogGrammar } from "@/api/learn";
import { IBlog, IRequestBlogGrammar } from "@/types/LearnType/blog";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogByGrammar = ({
  page = 1,
  limit = 6,
  grammarPointId,
}: IRequestBlogGrammar) => {
  const { data, error, isLoading, refetch } = useQuery<IBlog, Error>({
    queryKey: ["getBlogGrammar"],
    queryFn: () => getBlogGrammar({ page, limit, grammarPointId }),
  });
  return { data, error, isLoading, refetch };
};

import { getBlogDetail } from "@/api/learn";
import { IBlogData } from "@/types/LearnType/blog";
import { useQuery } from "@tanstack/react-query";

export const useGetBloDetail = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IBlogData, Error>({
    queryKey: ["getBlogDetail", id],
    queryFn: () => getBlogDetail(id),
  });
  return { data, error, isLoading, refetch };
};

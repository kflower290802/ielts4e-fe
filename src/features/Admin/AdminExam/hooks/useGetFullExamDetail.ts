import { getFullExamDetail } from "@/api/AdminAPI/exam";
import { useQuery } from "@tanstack/react-query";

export const useGetFullExamDetail = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["exampassagebyId", id],
    queryFn: () => getFullExamDetail(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

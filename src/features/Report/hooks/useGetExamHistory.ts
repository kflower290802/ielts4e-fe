import { getExamHistory } from "@/api/report";
import { IHistory } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetExamHistory= () => {
  const { data, error, isLoading, refetch } = useQuery<IHistory[], Error>({
    queryKey: ["getExamHistory"],
    queryFn: () => getExamHistory(),
  });
  return { data, error, isLoading, refetch };
};

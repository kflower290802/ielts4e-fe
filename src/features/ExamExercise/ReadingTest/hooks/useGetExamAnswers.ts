import { getExamAnswers } from "@/api/exam";
import { IExamResponse } from "@/types/exam";
import { useQuery } from "@tanstack/react-query";

export const useGetExamAnswers = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IExamResponse, Error>({
    queryKey: ["getExamAnswers"],
    queryFn: () => getExamAnswers(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

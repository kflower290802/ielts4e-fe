import { getExamResult } from "@/api/ExamAPI/exam";
import { useQuery } from "@tanstack/react-query";

export const useExamResult = (idResult: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["examResult", idResult],
    queryFn: () => getExamResult(idResult),
    enabled: !!idResult,
  });
  return { data, error, isLoading, refetch };
};

import { getExamReadingResult } from "@/api/readingExam";
import { IExamResult } from "@/types/exam";
import { useQuery } from "@tanstack/react-query";

export const useExamResult = (idResult: string) => {
  const { data, error, isLoading, refetch } = useQuery<IExamResult, Error>({
    queryKey: ["examResult"],
    queryFn: () => getExamReadingResult(idResult),
    enabled: !!idResult,
  });
  return { data, error, isLoading, refetch };
};

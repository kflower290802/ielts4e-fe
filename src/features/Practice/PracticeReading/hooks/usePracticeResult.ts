import { getExamReadingResult } from "@/api/ExamAPI/readingExam";
import { IPracticeResult } from "@/types/PracticeType/practice";
import { useQuery } from "@tanstack/react-query";

export const usePracticeResult = (idResult: string) => {
  const { data, error, isLoading, refetch } = useQuery<IPracticeResult, Error>({
    queryKey: ["examPracticeResult"],
    queryFn: () => getExamReadingResult(idResult),
    enabled: !!idResult,
  });
  return { data, error, isLoading, refetch };
};

import { getPracticeReadingResult } from "@/api/PracticeAPI/readingPractice";
import { IPracticeResult } from "@/types/PracticeType/practice";
import { useQuery } from "@tanstack/react-query";

export const usePracticeResult = (idResult: string) => {
  const { data, error, isLoading, refetch } = useQuery<IPracticeResult, Error>({
    queryKey: ["getPracticeReadingResult"],
    queryFn: () => getPracticeReadingResult(idResult),
    enabled: !!idResult,
  });
  return { data, error, isLoading, refetch };
};

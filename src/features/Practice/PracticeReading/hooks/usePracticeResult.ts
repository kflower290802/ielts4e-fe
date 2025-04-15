import { getPracticeResult } from "@/api/PracticeAPI/practice";
import { useQuery } from "@tanstack/react-query";

export const usePracticeResult = (idResult: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getPracticeReadingResult"],
    queryFn: () => getPracticeResult
    (idResult),
    enabled: !!idResult,
  });
  return { data, error, isLoading, refetch };
};

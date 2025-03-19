import { getPracticeAnswers } from "@/api/PracticeAPI/practice";
import { IPractieResponse } from "@/types/PracticeType/practice";
import { ReadingQuestion } from "@/types/PracticeType/readingPractice";
import { useQuery } from "@tanstack/react-query";

export const useGetPracticeAnswers = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IPractieResponse<ReadingQuestion>, Error>({
    queryKey: ["getPracticeAnswers"],
    queryFn: () => getPracticeAnswers(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

import { getReadingPracticeById } from "@/api/PracticeAPI/readingPractice";
import { PracticeReading } from "@/types/PracticeType/readingPractice";
import { useQuery } from "@tanstack/react-query";

export const useReadingPracticePassage = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<
    PracticeReading,
    Error
  >({
    queryKey: ["practicepassage"],
    queryFn: () => getReadingPracticeById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

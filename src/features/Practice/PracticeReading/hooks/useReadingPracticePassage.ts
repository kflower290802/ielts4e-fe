import { getReadingPracticeById } from "@/api/PracticeAPI/readingPractice";
import { IPractice } from "@/types/PracticeType/practice";
import { PractiePassage } from "@/types/PracticeType/readingPractice";
import { useQuery } from "@tanstack/react-query";

export const useReadingPracticePassage = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<
    IPractice<PractiePassage>,
    Error
  >({
    queryKey: ["practicepassage"],
    queryFn: () => getReadingPracticeById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

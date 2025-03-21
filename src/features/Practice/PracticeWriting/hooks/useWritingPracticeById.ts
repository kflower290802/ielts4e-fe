import { getWritingPracticeById } from "@/api/PracticeAPI/writingExam";
import { IPractice } from "@/types/PracticeType/practice";
import { IPracticeContent } from "@/types/PracticeType/writingPractice";
import { useQuery } from "@tanstack/react-query";

export const useWritingPracticeById = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IPractice<IPracticeContent>, Error>({
    queryKey: ["writingPractice"],
    queryFn: () => getWritingPracticeById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

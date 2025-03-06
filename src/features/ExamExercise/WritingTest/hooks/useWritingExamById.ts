import { getWritingExamById } from "@/api/writingExam";
import { IExam } from "@/types/exam";
import { IContent } from "@/types/writingExam";
import { useQuery } from "@tanstack/react-query";

export const useWritingExamById = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IExam<IContent>, Error>({
    queryKey: ["writingExam"],
    queryFn: () => getWritingExamById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

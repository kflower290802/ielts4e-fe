import { getWritingExamById } from "@/api/ExamAPI/writingExam";
import { IExam } from "@/types/ExamType/exam";
import { IContent } from "@/types/ExamType/writingExam";
import { useQuery } from "@tanstack/react-query";

export const useWritingExamById = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IExam<IContent>, Error>({
    queryKey: ["writingExam"],
    queryFn: () => getWritingExamById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

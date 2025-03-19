import { getExamAnswers } from "@/api/ExamAPI/exam";
import { IExamResponse } from "@/types/ExamType/exam";
import { ReadingQuestion } from "@/types/ExamType/readingExam";
import { useQuery } from "@tanstack/react-query";

export const useGetExamAnswers = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IExamResponse<ReadingQuestion>, Error>({
    queryKey: ["getExamAnswers"],
    queryFn: () => getExamAnswers(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

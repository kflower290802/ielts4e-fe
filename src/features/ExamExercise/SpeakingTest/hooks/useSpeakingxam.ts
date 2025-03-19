import { getSpeakingExamById } from "@/api/ExamAPI/speakingExam";
import { IExam } from "@/types/ExamType/exam";
import { ExamQuestion } from "@/types/speakingExam";
import { useQuery } from "@tanstack/react-query";

export const useSpeakingExam = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<
    IExam<ExamQuestion>,
    Error
  >({
    queryKey: ["examSection"],
    queryFn: () => getSpeakingExamById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

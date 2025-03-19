import { getListeningExamById } from "@/api/ExamAPI/listeningExam";
import { IExam } from "@/types/ExamType/exam";
import { ExamSection } from "@/types/ExamType/listeningExam";
import { useQuery } from "@tanstack/react-query";

export const useListeningExamSection = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<
    IExam<ExamSection>,
    Error
  >({
    queryKey: ["examSection"],
    queryFn: () => getListeningExamById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

import { getListeningExamById } from "@/api/listeningExam";
import { IExam } from "@/types/exam";
import { ExamSection } from "@/types/listeningExam";
import { useQuery } from "@tanstack/react-query";

export const useListeningExamSection = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<
    IExam<ExamSection
    >,
    Error
  >({
    queryKey: ["examSection"],
    queryFn: () => getListeningExamById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

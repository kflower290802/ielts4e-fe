import { getExamById } from "@/api/ExamAPI/exam";
import { IExam } from "@/types/ExamType/exam";
import { useQuery } from "@tanstack/react-query";

export const useExamPassage = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IExam, Error>({
    queryKey: ["exampassagebyId", id],
    queryFn: () => getExamById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

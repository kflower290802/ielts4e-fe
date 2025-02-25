import { getExamById } from "@/api/exam";
import { IExam } from "@/types/exam";
import { useQuery } from "@tanstack/react-query";

export const useExamPassage = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IExam, Error>({
    queryKey: ["exampassage"],
    queryFn: () => getExamById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

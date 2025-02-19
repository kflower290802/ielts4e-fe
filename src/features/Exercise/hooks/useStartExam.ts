import { startExam } from "@/api/excercise";
import { IExam } from "@/types/exam";
import { useQuery } from "@tanstack/react-query";

export const useStartExam = (id:string) => {
  const { data, error, isLoading, refetch } = useQuery<IExam, Error>({
    queryKey: ["startExam"],
    queryFn: () => startExam(id),
    enabled: !!id
  });
  return { data, error, isLoading, refetch };
};

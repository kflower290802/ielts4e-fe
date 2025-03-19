import { getYear } from "@/api/ExamAPI/exam";
import { useQuery } from "@tanstack/react-query";

export const useGetPracticeYear = () => {
  const { data, error, isLoading, refetch } = useQuery<number[], Error>({
    queryKey: ["getPracticeYear"],
    queryFn: () => getYear(),
  });
  return { data, error, isLoading, refetch };
};

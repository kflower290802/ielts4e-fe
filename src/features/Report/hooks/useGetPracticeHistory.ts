import { getPracticeHistory } from "@/api/report";
import { IHistory } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetPracticeHistory= () => {
  const { data, error, isLoading, refetch } = useQuery<IHistory[], Error>({
    queryKey: ["getPracticeHistory"],
    queryFn: () => getPracticeHistory(),
  });
  return { data, error, isLoading, refetch };
};

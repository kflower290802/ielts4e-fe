import { getAvgScore } from "@/api/report";
import { IScore } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetAvgScore= () => {
  const { data, error, isLoading, refetch } = useQuery<IScore, Error>({
    queryKey: ["getAvgScore"],
    queryFn: () => getAvgScore(),
  });
  return { data, error, isLoading, refetch };
};

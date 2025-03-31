import { getScoreForDay } from "@/api/report";
import { IChart, IRequestChart } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetScoreChart= (date: IRequestChart) => {
  const { data, error, isLoading, refetch } = useQuery<IChart[], Error>({
    queryKey: ["getScoreForDay"],
    queryFn: () => getScoreForDay(date),
  });
  return { data, error, isLoading, refetch };
};

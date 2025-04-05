import { getTimeSpent } from "@/api/report";
import { IChart, IRequestChart } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetTimeChart= (date: IRequestChart) => {
  const { data, error, isLoading, refetch } = useQuery<IChart[], Error>({
    queryKey: ["getTimeSpent"],
    queryFn: () => getTimeSpent(date),
  });
  return { data, error, isLoading, refetch };
};

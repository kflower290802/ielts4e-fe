import { getRecentWork } from "@/api/home";
import { IHistory } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetRecentWork= () => {
  const { data, error, isLoading, refetch } = useQuery<IHistory[], Error>({
    queryKey: ["getRecentWork"],
    queryFn: () => getRecentWork(),
  });
  return { data, error, isLoading, refetch };
};

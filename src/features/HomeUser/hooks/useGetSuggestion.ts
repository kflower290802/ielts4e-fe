import { getSuggestion } from "@/api/home";
import { IExamHistory } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetSuggestion = () => {
  const { data, error, isLoading, refetch } = useQuery<IExamHistory[], Error>({
    queryKey: ["getSuggestion"],
    queryFn: () => getSuggestion(),
  });
  return { data, error, isLoading, refetch };
};

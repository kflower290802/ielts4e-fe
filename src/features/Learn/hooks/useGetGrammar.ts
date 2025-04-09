import { getGrammar } from "@/api/learn";
import { ITopics } from "@/types/LearnType/topic";
import { useQuery } from "@tanstack/react-query";

export const useGetGrammar = () => {
  const { data, error, isLoading, refetch } = useQuery<ITopics[], Error>({
    queryKey: ["getLearnGrammar"],
    queryFn: () => getGrammar(),
  });
  return { data, error, isLoading, refetch };
};

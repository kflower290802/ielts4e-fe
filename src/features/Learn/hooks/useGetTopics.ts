import { getTopic } from "@/api/learn";
import { ITopics } from "@/types/LearnType/topic";
import { useQuery } from "@tanstack/react-query";

export const useGetTopics = () => {
  const { data, error, isLoading, refetch } = useQuery<ITopics[], Error>({
    queryKey: ["getLearnTopic"],
    queryFn: () => getTopic(),
  });
  return { data, error, isLoading, refetch };
};

import { getTopic } from "@/api/PracticeAPI/practice";
import { IPracticeTopic } from "@/types/excercise";
import { useQuery } from "@tanstack/react-query";

export const useGetTopic = () => {
  const { data, error, isLoading, refetch } = useQuery<IPracticeTopic[], Error>({
    queryKey: ["getPracticeTopic"],
    queryFn: () => getTopic(),
  });
  return { data, error, isLoading, refetch };
};

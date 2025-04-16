import { getUserTarget } from "@/api/report";
import { IUserTarget } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

export const useGetUserTarget= (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<IUserTarget, Error>({
    queryKey: ["getUserTarget", id],
    queryFn: () => getUserTarget(id),
  });
  return { data, error, isLoading, refetch };
};

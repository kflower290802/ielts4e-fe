import { getDailyVisit } from "@/api/AdminAPI/home";
import { IRequestChart } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";

export const useGetVisit = (data: IRequestChart) => {
  return useQuery<string, Error>({
    queryKey: ["getDailyVisit"],
    queryFn: () => getDailyVisit(data),
  });
};
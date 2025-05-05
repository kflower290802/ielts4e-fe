import { getExcercisePractice } from "@/api/PracticeAPI/practice";
import {
  IExcercise,
  IRequestExcercisePractice,
  TypeExcercise,
} from "@/types/excercise";
import { useQuery } from "@tanstack/react-query";

export const useGetFullPractice = ({
  page = 1,
  limit = 8,
  type = TypeExcercise.Reading,
  ...rest
}: IRequestExcercisePractice) => {
  const { data, error, isLoading, refetch } = useQuery<IExcercise, Error>({
    queryKey: ["getFullPractice"],
    queryFn: () => getExcercisePractice({ ...rest, page, limit, type }),
  });
  return { data, error, isLoading, refetch };
};

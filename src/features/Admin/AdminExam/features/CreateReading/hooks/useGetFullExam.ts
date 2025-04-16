import { getExcercise } from "@/api/ExamAPI/exam";
import {
  IExcercise,
  IRequestExcercise,
  TypeExcercise,
} from "@/types/excercise";
import { useQuery } from "@tanstack/react-query";

export const useGetFullExam = ({
  page = 1,
  limit = 5,
  type = TypeExcercise.Reading,
  ...rest
}: IRequestExcercise) => {
  const { data, error, isLoading, refetch } = useQuery<IExcercise, Error>({
    queryKey: ["useGetFullExam"],
    queryFn: () => getExcercise({ ...rest, page, limit, type }),
  });
  return { data, error, isLoading, refetch };
};

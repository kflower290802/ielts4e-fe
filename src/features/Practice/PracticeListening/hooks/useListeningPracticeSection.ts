import { getListeningPracticeById } from "@/api/PracticeAPI/listeningExam";
import { PracticeSection } from "@/types/PracticeType/listeningPractice";
import { IPractice } from "@/types/PracticeType/practice";
import { useQuery } from "@tanstack/react-query";

export const useListeningPracticeSection = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery<
    IPractice<PracticeSection>,
    Error
  >({
    queryKey: ["practiceSection"],
    queryFn: () => getListeningPracticeById(id),
    enabled: !!id,
  });
  return { data, error, isLoading, refetch };
};

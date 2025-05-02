import { getTotalExam } from "@/api/AdminAPI/exam";
import { getTotalBlog } from "@/api/AdminAPI/learn";
import { getTotalPractices } from "@/api/AdminAPI/practice";
import { useQuery } from "@tanstack/react-query";

export const useTotalExam = () => {
  return useQuery<number, Error>({
    queryKey: ["totalExam"],
    queryFn: () => getTotalExam(),
  });
};
export const useTotalPractice = () => {
  return useQuery<number, Error>({
    queryKey: ["totalPractice"],
    queryFn: () => getTotalPractices(),
  });
};
export const useTotalBlog = () => {
  return useQuery<number, Error>({
    queryKey: ["totalblog"],
    queryFn: () => getTotalBlog(),
  });
};

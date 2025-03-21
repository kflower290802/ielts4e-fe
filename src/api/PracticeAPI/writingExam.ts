import { api } from "@/lib/api";
import { IPractice } from "@/types/PracticeType/practice";
import { IPracticeContent, IPracticeWritingAnswer } from "@/types/PracticeType/writingPractice";

export const getWritingPracticeById = (id: string): Promise<IPractice<IPracticeContent>> =>
  api.get(`/exams/exam/${id}`);
export const userPracticeWritingAnswers = (data: IPracticeWritingAnswer[]) =>
  api.post(`/user-exam-writings`, data);

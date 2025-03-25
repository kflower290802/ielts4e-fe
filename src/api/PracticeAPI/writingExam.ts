import { api } from "@/lib/api";
import { IPracticeWriting, IPracticeWritingAnswer } from "@/types/PracticeType/writingPractice";

export const getWritingPracticeById = (id: string): Promise<IPracticeWriting> =>
  api.get(`/practices/${id}`);
export const userPracticeWritingAnswers = (data: IPracticeWritingAnswer[]) =>
  api.post(`/user-exam-writings`, data);

import { api } from "@/lib/api";
import { IExam } from "@/types/exam";
import { IContent, IWritingAnswer } from "@/types/writingExam";

export const getWritingExamById = (id: string): Promise<IExam<IContent>> =>
  api.get(`/exams/exam/${id}`);
export const userExamWritingAnswers = (
  data: IWritingAnswer[]
) => api.post(`/user-exam-writings`, data);
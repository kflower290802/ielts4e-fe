import { api } from "@/lib/api";
import { IExamResponse } from "@/types/ExamType/exam";
import { ReadingQuestion } from "@/types/ExamType/readingExam";
import { IExcercise, IRequestExcercise } from "@/types/excercise";

export const getExcercise = (params: IRequestExcercise): Promise<IExcercise> =>
  api.get(`/exams`, {
    params,
  });
export const getYear = (): Promise<number[]> => api.get(`/exams/year`);
export const startExam = (id: string) => api.get(`/exams/start-exam/${id}`);
export const exitExam = (id: string) => api.post(`/exams/exit-exam/${id}`);
export const getExamAnswers = (
  id: string
): Promise<IExamResponse<ReadingQuestion>> =>
  api.get(`/user-exam-answers/${id}`);

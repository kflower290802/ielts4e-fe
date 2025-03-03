import { api } from "@/lib/api";
import { IExamResponse } from "@/types/exam";
import { IExcercise, IRequestExcercise } from "@/types/excercise";
import { ReadingQuestion } from "@/types/readingExam";

export const getExcercise = (params: IRequestExcercise): Promise<IExcercise> =>
  api.get(`/exams`, {
    params,
  });
export const getYear = (): Promise<number[]> => api.get(`/exams/year`);
export const startExam = (id: string) => api.get(`/exams/start-exam/${id}`);
export const exitExam = (id: string) => api.post(`/exams/exit-exam/${id}`);
export const getExamAnswers = (id: string): Promise<IExamResponse<ReadingQuestion>> => api.get(`/user-exam-answers/${id}`);



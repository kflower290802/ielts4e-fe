import { api } from "@/lib/api";
import { IExcercise, IRequestExcercise } from "@/types/excercise";
import { IPractieResponse } from "@/types/PracticeType/practice";
import { ReadingQuestion } from "@/types/PracticeType/readingPractice";

export const getExcercise = (params: IRequestExcercise): Promise<IExcercise> =>
  api.get(`/exams`, {
    params,
  });
export const getYear = (): Promise<number[]> => api.get(`/exams/year`);
export const startPractice = (id: string) => api.get(`/exams/start-exam/${id}`);
export const exitPractice = (id: string) => api.post(`/exams/exit-exam/${id}`);
export const getPracticeAnswers = (
  id: string
): Promise<IPractieResponse<ReadingQuestion>> =>
  api.get(`/user-exam-answers/${id}`);

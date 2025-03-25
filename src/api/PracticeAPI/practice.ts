import { api } from "@/lib/api";
import { IExcercise, IPracticeTopic, IRequestExcercisePractice } from "@/types/excercise";
import { IPractieResponse } from "@/types/PracticeType/practice";
import { ReadingQuestion } from "@/types/PracticeType/readingPractice";

export const getExcercisePractice = (params: IRequestExcercisePractice): Promise<IExcercise> =>
  api.get(`/practices`, {
    params,
  });
export const getTopic = (): Promise<IPracticeTopic[]> => api.get(`/topics`);
export const startPractice = (id: string) => api.get(`/practices/start-practice/${id}`);
export const exitPractice = (id: string) => api.post(`/exams/exit-exam/${id}`);
export const getPracticeAnswers = (
  id: string
): Promise<IPractieResponse<ReadingQuestion>> =>
  api.get(`/user-exam-answers/${id}`);

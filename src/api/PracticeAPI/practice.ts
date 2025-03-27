import { api } from "@/lib/api";
import { IExcercise, IPracticeTopic, IRequestExcercisePractice } from "@/types/excercise";
import { IPracticeAnswerSubmit, IPractieResponse } from "@/types/PracticeType/practice";
import { ReadingQuestion } from "@/types/PracticeType/readingPractice";

export const getExcercisePractice = (params: IRequestExcercisePractice): Promise<IExcercise> =>
  api.get(`/practices`, {
    params,
  });
export const getTopic = (): Promise<IPracticeTopic[]> => api.get(`/topics`);
export const startPractice = (id: string) => api.get(`/practices/start-practice/${id}`);
export const getPracticeAnswers = (
  id: string
): Promise<IPractieResponse<ReadingQuestion>> =>
  api.get(`/user-exam-answers/${id}`);
export const practiceExit = (
  data: IPracticeAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/practices/exit/${id}`, data);
export const practiceSubmit = (
  data: IPracticeAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/practices/submit/${id}`, data);
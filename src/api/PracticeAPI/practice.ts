import { api } from "@/lib/api";
import { IExcercise, IPracticeTopic, IRequestExcercisePractice } from "@/types/excercise";
import { IPracticeAnswerSubmit, IPracticeResult, IWritingSummary } from "@/types/PracticeType/practice";

export const getExcercisePractice = (params: IRequestExcercisePractice): Promise<IExcercise> =>
  api.get(`/practices`, {
    params,
  });
export const getTopic = (): Promise<IPracticeTopic[]> => api.get(`/topics`);
export const startPractice = (id: string) => api.get(`/practices/start-practice/${id}`);

export const getPracticeResult = (
  idResult: string
): Promise<IPracticeResult | IWritingSummary> => api.get(`/practices/summary/${idResult}`);
export const practiceExit = (
  data: IPracticeAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/practices/exit/${id}`, data);
export const practiceSubmit = (
  data: IPracticeAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/practices/submit/${id}`, data);
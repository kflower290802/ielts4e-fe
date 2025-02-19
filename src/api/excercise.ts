import { api } from "@/lib/api";
import { IExam } from "@/types/exam";
import { IExcercise, IRequestExcercise } from "@/types/excercise";

export const getExcercise = (params: IRequestExcercise): Promise<IExcercise> =>
  api.get(`/exams`, {
    params,
  });
export const getYear = (): Promise<number[]> => api.get(`/exams/year`);
export const startExam = (id: string): Promise<IExam> => api.get(`/exams/start-exam/${id}`);

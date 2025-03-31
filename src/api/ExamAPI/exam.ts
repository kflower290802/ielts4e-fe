import { api } from "@/lib/api";
import { IExam, IExamAnswerSubmit, IExamResult } from "@/types/ExamType/exam";
import { IExcercise, IRequestExcercise } from "@/types/excercise";

export const getExcercise = (params: IRequestExcercise): Promise<IExcercise> =>
  api.get(`/exams`, {
    params,
  });
export const getYear = (): Promise<number[]> => api.get(`/exams/year`);
export const startExam = (id: string) => api.get(`/exams/start-exam/${id}`);
export const getExamById = (id: string): Promise<IExam> =>
  api.get(`/exams/exam/${id}`);
export const getExamResult = (idResult: string): Promise<IExamResult> => api.get(`/exams/exam-summary/${idResult}`);
export const examExit = (
  data: IExamAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/exams/exit-exam/${id}`, data);
export const examSubmit = (
  data: IExamAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/exams/submit-exam/${id}`, data);
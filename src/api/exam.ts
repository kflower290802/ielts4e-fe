import { api } from "@/lib/api";
import { IExam, IExamAnswerSubmit, IExamResponse, IExamResult, IUserAnswer } from "@/types/exam";
import { IExcercise, IRequestExcercise } from "@/types/excercise";

export const getExcercise = (params: IRequestExcercise): Promise<IExcercise> =>
  api.get(`/exams`, {
    params,
  });
export const getYear = (): Promise<number[]> => api.get(`/exams/year`);
export const startExam = (id: string) => api.get(`/exams/start-exam/${id}`);
export const getExamById = (id: string): Promise<IExam> => api.get(`/exams/exam/${id}`);
export const exitExam = (id: string) => api.post(`/exams/exit-exam/${id}`);
export const userExamAnswers = (data: IUserAnswer[]): Promise<IExamResponse> => api.post(`/user-exam-answers`, data);
export const getExamAnswers = (id: string): Promise<IExamResponse> => api.get(`/user-exam-answers/${id}`);
export const examReadingSubmit = (data: IExamAnswerSubmit[], id: string): Promise<string> => api.post(`/exams/submit-exam/${id}`, data);
export const getExamReadingResult = (idResult: string): Promise<IExamResult> => api.get(`/exams/exam-summary/${idResult}`);


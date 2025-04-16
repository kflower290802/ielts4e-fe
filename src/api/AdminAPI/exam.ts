import { api } from "@/lib/api";
import { ICreatePassage, ICreateQuestion, IExamDetail } from "@/types/admin";
import { IExcerciseDetail } from "@/types/excercise";

export const createExam = (exam: FormData): Promise<IExcerciseDetail> => api.post('/exams', exam, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const getFullExamDetail = (id: string): Promise<IExamDetail> =>
  api.get(`/exams/exam-detail/${id}`);
export const createPassage = (
  data: ICreatePassage,
): Promise<string> => api.post(`/exam-passages/`, data);
export const createType = (
  data: FormData,
): Promise<string> => api.post(`/exam-reading-types`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const createQuestion = (
  data: ICreateQuestion,
): Promise<string> => api.post(`/exam-passage-questions`, data);
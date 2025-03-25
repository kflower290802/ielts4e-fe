import { api } from "@/lib/api";
import { IUserAnswer } from "@/types/ExamType/exam";
import {
  IPracticeAnswerSubmit,
  IPracticeResult,
  IPractieResponse,
} from "@/types/PracticeType/practice";
import {
  PracticeReading,
  ReadingQuestion,
} from "@/types/PracticeType/readingPractice";

export const practiceReadingSubmit = (
  data: IPracticeAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/practices/submit/${id}`, data);
export const getPracticeReadingResult = (
  idResult: string
): Promise<IPracticeResult> => api.get(`/exams/exam-summary/${idResult}`);
export const getReadingPracticeById = (
  id: string
): Promise<PracticeReading> => api.get(`/practices/${id}`);
export const userPracticeAnswers = (
  data: IUserAnswer[]
): Promise<IPractieResponse<ReadingQuestion>> =>
  api.post(`/user-exam-answers`, data);

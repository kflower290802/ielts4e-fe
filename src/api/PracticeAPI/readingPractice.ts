import { api } from "@/lib/api";
import { IExamAnswerSubmit, IUserAnswer } from "@/types/ExamType/exam";
import {
  IPractice,
  IPracticeResult,
  IPractieResponse,
} from "@/types/PracticeType/practice";
import {
  PractiePassage,
  ReadingQuestion,
} from "@/types/PracticeType/readingPractice";

export const practiceReadingSubmit = (
  data: IExamAnswerSubmit[],
  id: string
): Promise<string> => api.post(`/exams/submit-exam/${id}`, data);
export const getPracticeReadingResult = (
  idResult: string
): Promise<IPracticeResult> => api.get(`/exams/exam-summary/${idResult}`);
export const getReadingPracticeById = (
  id: string
): Promise<IPractice<PractiePassage>> => api.get(`/exams/exam/${id}`);
export const userPracticeAnswers = (
  data: IUserAnswer[]
): Promise<IPractieResponse<ReadingQuestion>> =>
  api.post(`/user-exam-answers`, data);

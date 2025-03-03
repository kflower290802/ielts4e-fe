import { api } from "@/lib/api";
import { IExam, IExamAnswerSubmit, IExamResponse, IExamResult, IUserAnswer } from "@/types/exam";
import { ExamPassage, ReadingQuestion } from "@/types/readingExam";

export const examReadingSubmit = (data: IExamAnswerSubmit[], id: string): Promise<string> => api.post(`/exams/submit-exam/${id}`, data);
export const getExamReadingResult = (idResult: string): Promise<IExamResult> => api.get(`/exams/exam-summary/${idResult}`);
export const getReadingExamById = (id: string): Promise<IExam<ExamPassage>> => api.get(`/exams/exam/${id}`);
export const userExamAnswers = (data: IUserAnswer[]): Promise<IExamResponse<ReadingQuestion>> => api.post(`/user-exam-answers`, data);

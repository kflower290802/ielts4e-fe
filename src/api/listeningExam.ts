import { api } from "@/lib/api";
import { IExam, IExamResponse, IUserAnswer, IUserListenAnswer } from "@/types/exam";
import { ExamSection, ListeningQuestion } from "@/types/listeningExam";

export const getListeningExamById = (id: string): Promise<IExam<ExamSection>> => api.get(`/exams/exam/${id}`);
export const userListeningExamAnswers = (data: IUserListenAnswer[]): Promise<IExamResponse<ListeningQuestion>> => api.post(`/user-exam-listen-answers`, data);

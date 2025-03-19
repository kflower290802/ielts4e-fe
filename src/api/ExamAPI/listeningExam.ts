import { api } from "@/lib/api";
import { IExam, IExamResponse, IUserAnswer } from "@/types/ExamType/exam";
import { ExamSection, ListeningQuestion } from "@/types/ExamType/listeningExam";

export const getListeningExamById = (id: string): Promise<IExam<ExamSection>> =>
  api.get(`/exams/exam/${id}`);
export const userListeningExamAnswers = (
  data: IUserAnswer[]
): Promise<IExamResponse<ListeningQuestion>> =>
  api.post(`/user-exam-listen-answers`, data);

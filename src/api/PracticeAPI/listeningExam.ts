import { api } from "@/lib/api";
import { ListeningQuestion, PracticeSection } from "@/types/PracticeType/listeningPractice";
import { IPractice, IPractieResponse, IUserAnswer } from "@/types/PracticeType/practice";

export const getListeningPracticeById = (id: string): Promise<IPractice<PracticeSection>> =>
  api.get(`/exams/exam/${id}`);
export const userListeningPracticeAnswers = (
  data: IUserAnswer[]
): Promise<IPractieResponse<ListeningQuestion>> =>
  api.post(`/user-exam-listen-answers`, data);

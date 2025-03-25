import { api } from "@/lib/api";
import { ListeningQuestion, PracticeListening } from "@/types/PracticeType/listeningPractice";
import { IPractieResponse, IUserAnswer } from "@/types/PracticeType/practice";

export const getListeningPracticeById = (id: string): Promise<PracticeListening> =>
  api.get(`/practices/${id}`);
export const userListeningPracticeAnswers = (
  data: IUserAnswer[]
): Promise<IPractieResponse<ListeningQuestion>> =>
  api.post(`/user-exam-listen-answers`, data);

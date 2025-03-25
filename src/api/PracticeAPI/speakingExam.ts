import { api } from "@/lib/api";
import { PracticeSpeaking } from "@/types/PracticeType/speakingPractice";

// export const userListeningExamAnswers = (data: IUserAnswer[]): Promise<IExamResponse<ListeningQuestion>> => api.post(`/user-exam-listen-answers`, data);
export const getSpeakingPracticeById = (
  id: string
): Promise<PracticeSpeaking[]> => api.get(`/practices/${id}`);
// export const userExamSpeakAnswers = (
//   data: FormData
// ): Promise<IExamSpeakResponse> =>
//   api.post(`/user-exam-speak-answers`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

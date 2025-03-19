import { api } from "@/lib/api";
import { IExam } from "@/types/ExamType/exam";
import { ExamQuestion, IExamSpeakResponse } from "@/types/ExamType/speakingExam";

// export const userListeningExamAnswers = (data: IUserAnswer[]): Promise<IExamResponse<ListeningQuestion>> => api.post(`/user-exam-listen-answers`, data);
export const getSpeakingExamById = (id: string): Promise<IExam<ExamQuestion>> =>
  api.get(`/exams/exam/${id}`);
export const userExamSpeakAnswers = (
  data: FormData
): Promise<IExamSpeakResponse> =>
  api.post(`/user-exam-speak-answers`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

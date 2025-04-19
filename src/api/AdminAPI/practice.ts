import { api } from "@/lib/api";
import { ICreateReadingPracticeQuestion, IPracticeDetail } from "@/types/admin";
import { IExcerciseDetail } from "@/types/excercise";

export const createPractice = (practice: FormData): Promise<IExcerciseDetail> =>
  api.post("/practices", practice, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const createPracticePassage = (data: FormData): Promise<string> =>
  api.post(`/practice-readings/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getFullPracticeDetail = (id: string): Promise<IPracticeDetail> =>
  api.get(`/practices/detail/${id}`);

export const createPracticeType = (data: FormData): Promise<string> =>
  api.post(`/practice-reading-types`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const createReadingPracticeQuestion = (data: ICreateReadingPracticeQuestion): Promise<string> =>
  api.post(`/practice-reading-questions`, data);

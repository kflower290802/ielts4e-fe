import { api } from "@/lib/api";
import { IPracticeResult } from "@/types/PracticeType/practice";
import { PracticeReading } from "@/types/PracticeType/readingPractice";

export const getPracticeReadingResult = (
  idResult: string
): Promise<IPracticeResult> => api.get(`/practices/summary/${idResult}`);
export const getReadingPracticeById = (id: string): Promise<PracticeReading> =>
  api.get(`/practices/${id}`);

import { api } from "@/lib/api";
import { PracticeReading } from "@/types/PracticeType/readingPractice";

export const getReadingPracticeById = (id: string): Promise<PracticeReading> =>
  api.get(`/practices/${id}`);

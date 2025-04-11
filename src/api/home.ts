import { api } from "@/lib/api";
import { IExamHistory, IHistory } from "@/types/report";

export const getRecentWork = (): Promise<IHistory[]> =>
    api.get(`/user-exams/recent-exams`);
export const getSuggestion = (): Promise<IExamHistory[]> =>
    api.get(`/user-exams/suggestion-exams`);
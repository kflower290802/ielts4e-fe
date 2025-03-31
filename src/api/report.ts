import { api } from "@/lib/api";
import { IChart, IRequestChart, IScore } from "@/types/report";

export const getAvgScore = (): Promise<IScore> =>
    api.get(`/user-exams/avg-score`);
export const getScoreForDay = (date: IRequestChart): Promise<IChart[]> =>
    api.get(`/user-exams/scores-by-period-day`, {params: date});
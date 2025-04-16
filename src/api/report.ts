import { api } from "@/lib/api";
import {
  IChart,
  IHistory,
  IRequestChart,
  IScore,
  IUserTarget,
} from "@/types/report";

export const getAvgScore = (): Promise<IScore> =>
  api.get(`/user-exams/avg-score`);
export const getUserTarget = (id: string): Promise<IUserTarget> =>
  api.get(`/users/${id}`);
export const updateTarget = (id: string, data: {target: number}): Promise<IUserTarget> =>
  api.patch(`/users/${id}`, data);
export const getScoreForDay = (date: IRequestChart): Promise<IChart[]> =>
  api.get(`/user-exams/scores-by-period-day`, { params: date });
export const getTimeSpent = (date: IRequestChart): Promise<IChart[]> =>
  api.get(`/exams/time-spent`, { params: date });
export const getExamHistory = (): Promise<IHistory[]> =>
  api.get(`/user-exams/exam-recently`);
export const getPracticeHistory = (): Promise<IHistory[]> =>
  api.get(`/user-practices/recent-practices`);

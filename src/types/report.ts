import { StringValidation } from "zod";

export interface IScore {
  reading: number;
  listening: number;
  speaking: number;
  writing: number;
}
export interface IRequestChart {
  startTime?: Date;
  endTime?: Date;
}
export interface IHistory {
  id: string;
  exam: {
    id: string;
    name: string;
  }
  practice: {
    id: string;
    name: string;
  }
  score: number;
  isCompleted: boolean;
  startTime: string;
  endTime: string;
}
export interface IChart {
  date: string;
  writing: number;
  speaking: number;
  listening: number;
  reading: number;
}

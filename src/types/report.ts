
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
  exam: IExamHistory;
  practice: {
    id: string;
    name: string;
  }
  score: number;
  isCompleted: boolean;
  startTime: string;
  endTime: string;
  updatedAt: string;
  createdAt: string;
}
export interface IExamHistory {
  id: string;
  name: string;
  image: string;
  time: number;
  type: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}
export interface IChart {
  date: string;
  writing: number;
  speaking: number;
  listening: number;
  reading: number;
}

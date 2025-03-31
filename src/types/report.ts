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
export interface IChart {
  date: string;
  writing: number;
  speaking: number;
  listening: number;
  reading: number;
}


export interface IExcercise {
  data: [
    {
      id: string;
      name: string;
      type: string;
      time: number;
      image: string;
      year: number;
      createdAt: string;
      updatedAt: string;
      status: StatusExcercise
    }
  ];
  pages?: number;
  page?: number;
  limit?: 10;
  total?: number;
}
export enum TypeExcercise {
    Reading = "reading",
    Listening = "listening",
    Writing = "writing",
    Speaking = "speaking",
    Grammar = "grammar",
    Vocabulary = "vocabulary"
}
export enum StatusExcercise {
    NotStarted = "not-started",
    InProgress = "in-progress",
    Completed = "completed",
}
export interface IRequestExcercise {
    page?: number,
    limit?: number,
    type?: TypeExcercise,
    status?: StatusExcercise
    year?: string
}


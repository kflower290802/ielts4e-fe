export interface IExam {
  exam: ExamPassage[];
  answers: Answer[];
  remainingTime: number;
}

export interface ExamPassage {
  id: string;
  exam: {
    id: string;
  };
  passage: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface Question {
  id: string;
  examPassage: {
    id: string;
  };
  question: string;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  questionId: string;
  answer: string;
}

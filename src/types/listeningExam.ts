export interface ExamSection {
  id: string;
  audio: string;
  exam: {
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  questions: ListeningQuestion[];
}
export interface ListeningQuestion {
  id: string;
  examListenSection: {
    id: string;
  };
  question: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  answers: ListeningAnswer[];
}
export interface ListeningAnswer {
  id: string;
  examListenQuestion: {
    id: string;
  };
  answer: string;
  createdAt: string;
  updatedAt: string;
}

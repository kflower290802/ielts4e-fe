export interface IPracticeWriting {
    id: string,
    content: string,
    practice: {
        id: string,
    },
    image: string,
    createdAt: string,
    updatedAt: string,
    answer: WritingAnswer
}
export interface WritingAnswer {
    id: string;
    userPractice: {
      id: string;
    };
    answer: string;
    createdAt: string;
    updatedAt: string;
  }
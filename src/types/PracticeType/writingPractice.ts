export interface IPracticeWriting {
    id: string,
    content: string,
    practice: {
        id: string,
    },
    image: string,
    createdAt: string,
    updatedAt: string,
    answer: string
}
export interface IPracticeWritingAnswer {
    examId: string;
    examWritingId: string;
    answer: string;
}
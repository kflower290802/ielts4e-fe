export interface IPracticeContent {
    id: string,
    content: string,
    exam: {
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
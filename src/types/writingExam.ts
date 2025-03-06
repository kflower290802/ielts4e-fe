export interface IContent {
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
export interface IWritingAnswer {
    examId: string;
    examWritingId: string;
    answer: string;
}
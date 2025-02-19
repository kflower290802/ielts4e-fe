export interface IExam{
    exam: {
      id: string,
      name: string,
      image: string,
      time: number,
      type: string,
      year: number,
      createdAt: string,
      updatedAt: string,
      examPassage: ExamPassage[]
    },
    remainingTime: number
  }
interface ExamPassage {
    id: string,
    exam: {
      id: string
    },
    passage: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    questions: [
      {
        id: string,
        examPassage: {
          id: string
        },
        question: string,
        createdAt: string,
        updatedAt: string
      }
    ]
}
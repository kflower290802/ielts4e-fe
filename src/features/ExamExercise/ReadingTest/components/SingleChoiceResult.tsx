import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReadingQuestion } from "@/types/readingExam";
import React from "react";

interface Props {
  index: number;
  question: ReadingQuestion;
  userAnswer: string | undefined;
  correctAnswer: string | undefined;
  isCorrect: boolean | undefined;
}

const AnswerList = ["A", "B", "C", "D", "E"];

const SingleChoiceResult: React.FC<Props> = ({
  index,
  question,
  userAnswer,
  correctAnswer,
  isCorrect,
}) => {
  return (
    <div className="border rounded-md p-2">
      <div className="flex flex-col space-y-2">
        <p>
          {index + 1}, {question.question}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {question.answers.map((answer, index) => (
            <div key={answer.id} className="flex space-x-2 items-center">
              <Button
                className={cn(
                  "rounded-full bg-[#D9D9D9] font-bold",
                  answer.answer === userAnswer && isCorrect
                    ? "bg-[#66B032] text-white"
                    : !isCorrect && answer.answer === userAnswer
                    ? "bg-red-500 text-white"
                    : !isCorrect && correctAnswer === answer.answer && "bg-[#66B032] text-white",
                    !isCorrect && userAnswer === '' && answer.answer === correctAnswer && 'bg-yellow-500 text-white'
                )}
              >
                {AnswerList[index]}
              </Button>
              <span>{answer.answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleChoiceResult;

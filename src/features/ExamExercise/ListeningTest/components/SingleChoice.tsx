import { cn } from "@/lib/utils";
import { ListeningQuestion } from "@/types/listeningExam";
import React from "react";

interface Props {
  index: number;
  question: ListeningQuestion;
  onClick: (questionId: string, answer: string) => void;
  currentAnswer: string;
}

const AnswerList = ["A", "B", "C", "D", "E"];

const SingleChoice: React.FC<Props> = ({
  index,
  question,
  onClick,
  currentAnswer,
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
              <button
                className={cn(
                  "size-8 rounded-full bg-[#D9D9D9]",
                  currentAnswer === answer.answer && "bg-[#3C64CE] text-white"
                )}
                onClick={() => onClick(question.id, answer.answer)}
              >
                {AnswerList[index]}
              </button>
              <span>{answer.answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleChoice;

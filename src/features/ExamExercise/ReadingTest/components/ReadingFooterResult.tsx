import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IExamResult } from "@/types/exam";
import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { ExamPassage, ReadingQuestion } from "@/types/readingExam";
interface IProps {
  passages: ExamPassage[];
  passageParam: string;
  setCurrentPassage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionPage: React.Dispatch<React.SetStateAction<number>>;
  questions: ReadingQuestion[];
  result: IExamResult | undefined;
}
const ReadingFooterResult = ({
  passages,
  passageParam,
  setCurrentPassage,
  setCurrentQuestionPage,
  questions,
  result,
}: IProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white h-28 px-6">
      <div className="flex h-full items-center justify-between gap-20">
        <div className="flex gap-10 w-1/3 overflow-x-auto">
          {passages?.map((passage, idx) => (
            <div
              className="flex flex-col items-center gap-3 py-3"
              key={passage.id}
            >
              <Button
                key={passage.id}
                onClick={() => {
                  setCurrentPassage(idx + 1);
                  setCurrentQuestionPage(1);
                }}
                className={cn(
                  Number(passageParam) === idx + 1
                    ? "bg-white border-2 border-[#66B032] text-[#66B032] font-bold px-8 py-5 hover:bg-[#66B032] hover:text-white"
                    : "bg-white border-2 px-8 py-5 hover:bg-[#66B032] hover:text-white"
                )}
              >
                Passage {idx + 1}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 w-1/3">
          <div className="grid grid-cols-10 gap-3">
            {questions?.map((question, idx) => {
              // Tìm kết quả theo questionId
              const questionSummary = result?.summary.find(
                (q) => q.questionId === question.id
              );

              return (
                <Button
                  key={question.id}
                  className={cn(
                    "h-8 w-8 rounded-full p-0 font-bold transition-colors",
                    questionSummary?.isCorrect
                      ? "bg-[#66B032] hover:bg-[#66B032]/80 text-white"
                      : "bg-red-600 hover:bg-red-600/70 text-white",
                    !questionSummary?.isCorrect && questionSummary?.userAnswer === '' && 'bg-yellow-500 text-white hover:bg-yellow-400'
                  )}
                  onClick={() => {
                    const newPage = Math.floor(idx / 20) + 1;
                    setCurrentQuestionPage(newPage);
                  }}
                >
                  {idx + 1}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="w-1/6 flex justify-end">
          <Badge className="ml-4 bg-[#66B032] py-2 px-4 hover:bg-[#66B032]/80 text-base text-white font-bold rounded-xl">
            Score: {result?.score.toFixed(2)} / 10
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default memo(ReadingFooterResult);

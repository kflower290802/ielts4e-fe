import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { ExamPassage } from "@/types/ExamType/readingExam";
import { IPracticeResult } from "@/types/PracticeType/practice";
interface IProps {
  passages: ExamPassage[];
  passageParam: string;
  result: IPracticeResult | undefined;
  totalQuestions: number;
}
const ReadingFooterPracticeResult = ({
  passages,
  passageParam,
  totalQuestions,
  result,
}: IProps) => {
  const allQuestions = passages.flatMap((passage) =>
    passage.types.flatMap((type) => type.questions)
  );
  return (
    <div className="absolute bottom-0 left-10 right-0 h-20 px-6">
      <div className="flex h-full items-center justify-between gap-20">
        <div className="flex items-center gap-5 w-2/3 overflow-x-auto">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            // Tìm kết quả theo questionId
            const question = allQuestions[idx];
            // Tìm kết quả theo questionId
            const questionSummary = result?.summary.find(
              (q) => q.questionId === question?.id
            );

            return (
              <Button
                key={question.id}
                className={cn(
                  "h-8 w-8 rounded-full p-0 font-bold transition-colors",
                  questionSummary?.isCorrect
                    ? "bg-[#66B032] hover:bg-[#66B032]/80 text-white"
                    : "bg-red-600 hover:bg-red-600/70 text-white",
                  !questionSummary?.isCorrect &&
                    questionSummary?.userAnswer === "" &&
                    "bg-yellow-500 text-white hover:bg-yellow-400"
                )}
              >
                {idx + 1}
              </Button>
            );
          })}
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

export default memo(ReadingFooterPracticeResult);

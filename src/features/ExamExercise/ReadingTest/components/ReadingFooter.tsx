import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { memo, useState } from "react";
import { ExamPassage } from "@/types/readingExam";
import DialogSubmitConfirm from "../../components/DialogSubmitConfirm";
import { Route } from "@/constant/route";
interface IProps {
  passages: ExamPassage[];
  answers: Record<string, string>;
  passageParam: string;
  totalQuestions: number;
  setCurrentPassage: React.Dispatch<React.SetStateAction<number>>;
  // setCurrentQuestionPage: React.Dispatch<React.SetStateAction<number>>;
  // questions: ReadingQuestion[];
  id: string | undefined;
}
const ReadingFooter = ({
  passages,
  passageParam,
  totalQuestions,
  setCurrentPassage,
  // setCurrentQuestionPage,
  // questions,
  answers,
  id,
}: IProps) => {
  const [openDia, setOpenDia] = useState<boolean>(false);
  const answeredQuestionsCount = (passageId: string) => {
    const passage = passages.find((p) => p.id === passageId);
    if (!passage) return 0;

    return passage.types.reduce((total, type) => {
      return total + type.questions.filter((q) => answers[q.id])?.length;
    }, 0);
  };
  const countQuestionsInPassage = (passageId: string) => {
    const passage = passages.find((p) => p.id === passageId);
    if (!passage) return 0;

    return passage.types.reduce(
      (total, type) => total + type.questions.length,
      0
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white h-28 px-6">
      <DialogSubmitConfirm
        openDia={openDia}
        setOpenDia={setOpenDia}
        totalQuestion={totalQuestions}
        answers={answers}
        id={id}
        route={Route.ExamReadingResult}
      />
      <div className="flex h-full items-center justify-between gap-20">
        <div className="flex items-center gap-10 w-1/3 overflow-x-auto">
          {passages?.map((passage, idx) => (
            <div className="flex flex-col items-center gap-3" key={passage.id}>
              <Button
                onClick={() => {
                  setCurrentPassage(idx + 1);
                }}
                className={cn(
                  Number(passageParam) === idx + 1
                    ? "bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
                    : "bg-white border-2 px-8 py-5 hover:bg-[#164C7E] hover:text-white",
                  answeredQuestionsCount(passage.id) ===
                    countQuestionsInPassage(passage.id) &&
                    "border-2 border-[#188F09] text-[#188F09] hover:bg-[#188F09]"
                )}
              >
                Passage {idx + 1}
              </Button>
              <span>
                {answeredQuestionsCount(passage.id)}/
                {countQuestionsInPassage(passage.id)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 w-1/3">
          <div className="grid grid-cols-10 gap-3">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              // Tìm passage và question tương ứng với index hiện tại
              let questionId = "";
              let currentIndex = idx;
              let found = false;

              for (const passage of passages) {
                for (const type of passage.types) {
                  if (currentIndex < type.questions.length) {
                    questionId = type.questions[currentIndex].id;
                    found = true;
                    break;
                  }
                  currentIndex -= type.questions.length;
                }
                if (found) break;
              }

              const isAnswered = !!answers[questionId];

              return (
                <Button
                  key={questionId}
                  className={cn(
                    "h-8 w-8 rounded-full p-0 font-bold transition-colors",
                    isAnswered
                      ? "bg-[#3C64CE] text-white"
                      : "bg-[#D9D9D9] hover:bg-[#3C64CE] hover:text-white"
                  )}
                >
                  {idx + 1}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="w-1/6 flex justify-end">
          <Button
            className="ml-4 bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl"
            onClick={() => {
              setOpenDia(true);
            }}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ReadingFooter);

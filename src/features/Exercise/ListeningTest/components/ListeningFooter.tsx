import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IExam } from "@/types/exam";
import React, { memo, useState } from "react";
import DialogConfirm from "../../components/DialogConfirm";
interface IProps {
  passages: IExam["exam"]["examPassage"];
  answers: Record<string, string>;
  passageParam: string;
  totalQuestion: number | undefined;
  setCurrentPassage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionPage: React.Dispatch<React.SetStateAction<number>>;
  questions:
    | [
        {
          id: string;
          examPassage: {
            id: string;
          };
          question: string;
          createdAt: string;
          updatedAt: string;
        }
      ]
    | [];
}
const ListeningFooter = ({
  passages,
  passageParam,
  totalQuestion,
  setCurrentPassage,
  setCurrentQuestionPage,
  questions,
  answers,
}: IProps) => {
  const answeredQuestionsCount = (passageId: string) => {
    return (
      passages
        .find((p) => p.id === passageId)
        ?.questions.filter((q) => answers[q.id])?.length || 0
    );
  };
  const totalAnswered = Object.values(answers).filter(
    (answer) => answer.trim() !== ""
  ).length;
  const [openDia, setOpenDia] = useState<boolean>(false);
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white h-28 px-6">
      <DialogConfirm
        openDia={openDia}
        setOpenDia={setOpenDia}
        totalQuestion={totalQuestion}
        totalAnswered={totalAnswered}
      />
      <div className="flex h-full items-center justify-between gap-20">
        <div className="grid grid-cols-5 gap-10 min-w-1/3">
          {passages?.map((passage, idx) => (
            <div className="flex flex-col items-center gap-3" key={passage.id}>
              <Button
                key={passage.id}
                onClick={() => setCurrentPassage(idx + 1)}
                className={cn(
                  Number(passageParam) === idx + 1
                    ? "bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
                    : "bg-white border-2 px-8 py-5 hover:bg-[#164C7E] hover:text-white",
                  answeredQuestionsCount(passage.id) ===
                    passage.questions.length &&
                    "border-2 border-[#188F09] text-[#188F09]"
                )}
              >
                Passage {passageParam}
              </Button>
              <span>
                {answeredQuestionsCount(passage.id)}/{passage.questions.length}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 w-1/3">
          <div className="grid grid-cols-10 gap-3">
            {questions?.map((question, idx) => {
              const isAnswered = !!answers[question.id];
              return (
                <Button
                  key={question.id}
                  className={cn(
                    "h-8 w-8 rounded-full p-0 font-bold transition-colors",
                    isAnswered
                      ? "bg-[#3C64CE] text-white"
                      : "bg-[#D9D9D9] hover:bg-[#3C64CE] hover:text-white"
                  )}
                  onClick={() => {
                    const newPage = Math.floor(idx / 4) + 1;
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

export default memo(ListeningFooter);

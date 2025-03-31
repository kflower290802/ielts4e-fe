import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import DialogSubmitConfirm from "../../components/DialogSubmitConfirm";
import { Route } from "@/constant/route";
import { Skeleton } from "@/components/ui/skeleton";
import { ExamPassage } from "@/types/ExamType/exam";

interface IProps {
  questions: ExamPassage[] | undefined;
  currentPart: number;
  setCurrentPart: React.Dispatch<React.SetStateAction<number>>;
  answers: Record<string, string>;
  id: string | undefined;
  isLoading: boolean;
  isPartCompleted: (partIndex: number) => boolean;
}

const SpeakingFooter = ({
  questions,
  currentPart,
  setCurrentPart,
  answers,
  isLoading,
  id,
  isPartCompleted,
}: IProps) => {
  const [openDia, setOpenDia] = useState<boolean>(false);
  const totalQuestions = questions?.reduce((acc, passage) => {
    return acc + (passage.questions?.length || 0);
  }, 0);
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white h-20 px-6">
      <DialogSubmitConfirm
        openDia={openDia}
        setOpenDia={setOpenDia}
        totalQuestion={totalQuestions}
        answers={answers}
        id={id}
        route={Route.Exam}
      />
      <div className="flex h-full items-center justify-between gap-20">
        {isLoading ? (
          <div className="grid grid-cols-5 gap-10 min-w-1/3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex flex-col items-center gap-3" key={index}>
                <Skeleton className="w-20 h-10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-10 min-w-1/3">
            {questions?.map((question, index) => (
              <div
                className="flex flex-col items-center gap-3"
                key={question.id}
              >
                <Button
                  onClick={() => setCurrentPart(index + 1)}
                  className={cn(
                    Number(currentPart) === index + 1
                      ? "bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
                      : "bg-white border-2 px-8 py-5 hover:bg-[#164C7E] hover:text-white"
                  )}
                  disabled={index > 0 && !isPartCompleted(index)}
                >
                  PART {index + 1}
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="w-32 flex justify-end">
          <Button
            className="ml-4 bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl"
            onClick={() => setOpenDia(true)}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(SpeakingFooter);
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { setStorage } from "@/utils/storage";
import { useExamSubmit } from "../hooks/useExamSubmit";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  answers: Record<string, string>
  totalQuestion: number | undefined;
  id: string | undefined;
  route: string;
}
const DialogSubmitConfirm = ({
  openDia,
  setOpenDia,
  answers,
  totalQuestion,
  id,
  route,
}: IProps) => {
  const { mutateAsync: submit } = useExamSubmit(id ?? '');
  const nav = useNavigate();
  const totalAnswered = Object.values(answers).filter((answer) => {
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    if (typeof answer === "string") {
      return answer.trim() !== "";
    }
    return false;
  }).length;
  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      })
    );

    try {
      const res = await submit(formattedAnswers);
      setStorage("isTesting", "false");
      nav(`${route}/${id}/${res}`);
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  };

  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="md:w-full w-96 flex flex-col items-center md:h-56 h-96 bg-[#3C64CE] text-white font-bold md:p-4 p-6 text-center">
        <span>
          YOU HAVE COMPLETED {totalAnswered} / {totalQuestion} QUESTIONS.
        </span>
        <span>YOU HAVE 10 MINUTES LEFT </span>
        <span>ARE YOU SURE YOU WANT TO SUBMIT?</span>
        <div className="flex justify-between items-center w-2/3">
          <Button className="bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl">
            Review
          </Button>
          <Button
            className="bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSubmitConfirm;

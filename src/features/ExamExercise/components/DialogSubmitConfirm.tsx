import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useExamReadingSubmit } from "../ReadingTest/hooks/useExamReadingSubmit";
import { useNavigate } from "react-router-dom";
import { setStorage } from "@/utils/storage";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  answers: Record<string, string>;
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
  const { mutateAsync: submit } = useExamReadingSubmit(id ?? "");
  const nav = useNavigate();
  console.log({ answers });
  const totalAnswered = Object.values(answers).filter(
    (answer) => answer?.trim() !== ""
  ).length;
  const handleSubmit = async () => {
    // Chuyển đổi dữ liệu từ state `answers` sang định dạng mong muốn
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

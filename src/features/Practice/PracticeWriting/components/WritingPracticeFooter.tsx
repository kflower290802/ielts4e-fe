import { Button } from "@/components/ui/button";
import { Route } from "@/constant/route";
import { useState } from "react";
import DialogSubmitWritingPractice from "./DialogSubmitWritingPractice";
interface IProps {
  id: string | undefined;
  answers: string;
}
const WritingPracticeFooter = ({ id, answers }: IProps) => {
  const [openDia, setOpenDia] = useState<boolean>(false);
  return (
    <div className="h-20 flex justify-end items-center">
      <DialogSubmitWritingPractice
        openDia={openDia}
        setOpenDia={setOpenDia}
        answers={answers}
        id={id}
        route={Route.PracticeWritingResult}
      />
      <Button
        className="bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl"
        onClick={() => setOpenDia(true)}
      >
        SUBMIT
      </Button>
    </div>
  );
};

export default WritingPracticeFooter;

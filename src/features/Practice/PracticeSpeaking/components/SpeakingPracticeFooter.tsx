import { Button } from "@/components/ui/button";
import { Route } from "@/constant/route";
import { memo, useState } from "react";
import DialogSubmitPractice from "../../components/DialogSubmitPractice";
interface IProps {
    answers: Record<string, string>;
    id: string | undefined;
}
const SpeakingPracticeFooter = ({ id, answers }: IProps) => {
  const [openDia, setOpenDia] = useState<boolean>(false);
  return (
    <div className="h-10 flex items-end justify-end">
      <DialogSubmitPractice
        openDia={openDia}
        setOpenDia={setOpenDia}
        totalQuestion={3}
        answers={answers}
        id={id}
        route={Route.PracticeListeningResult}
      />
      <div className="flex justify-end">
        <Button
          className="bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl"
          onClick={() => setOpenDia(true)}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default memo(SpeakingPracticeFooter);

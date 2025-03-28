import { Button } from "@/components/ui/button";
import { Route } from "@/constant/route";
import { memo, useState } from "react";
import DialogSubmitSpeakingPractice from "./DialogSubmitSpeakingPractice";
import { PracticeSpeaking } from "@/types/PracticeType/speakingPractice";
interface IProps {
  id: string | undefined;
  audioAnswers: {
    [key: number]: string;
  };
  data: PracticeSpeaking[] | undefined;
}
const SpeakingPracticeFooter = ({ id, audioAnswers, data }: IProps) => {
  const [openDia, setOpenDia] = useState<boolean>(false);
  return (
    <div className="absolute bottom-0 right-5 h-20 flex items-center">
      <DialogSubmitSpeakingPractice
        openDia={openDia}
        setOpenDia={setOpenDia}
        audioAnswers={audioAnswers}
        data={data}
        id={id}
        route={Route.PracticeSpeakingResult}
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

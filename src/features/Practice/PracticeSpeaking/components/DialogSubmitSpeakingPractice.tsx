import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { setStorage } from "@/utils/storage";
import { PracticeSpeaking } from "@/types/PracticeType/speakingPractice";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  audioAnswers: {
    [key: number]: string;
  };
  id: string | undefined;
  route: string;
  data: PracticeSpeaking[] | undefined;
}
const DialogSubmitSpeakingPractice = ({
  openDia,
  setOpenDia,
  route,
  audioAnswers,
  data,
  id,
}: IProps) => {
  // const { mutateAsync: submit } = usePracticeSpeakingSubmit(id ?? "");
  const nav = useNavigate();
  const handleSubmit = async () => {
    try {
      const payload = data?.map((item, index) => ({
        questionId: item.id, // Giả sử mỗi item trong data có trường id
        answer: audioAnswers[index] || "", // URL audio từ Cloudinary, nếu không có thì để rỗng
      }));
      console.log(payload);
      
      // const res = await submit(data);
      setStorage("isTesting", "false");
      // nav(`${route}/${id}/${res}`);
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  };

  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="md:w-full w-96 flex flex-col gap-10 items-center md:h-40 h-80 bg-[#3C64CE] text-white font-bold md:p-4 p-6 text-center">
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

export default DialogSubmitSpeakingPractice;

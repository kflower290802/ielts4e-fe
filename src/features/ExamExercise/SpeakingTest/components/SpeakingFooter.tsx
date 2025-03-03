import { Button } from "@/components/ui/button";
import { memo } from "react";
const SpeakingFooter = () => {
  return (
    <div className="h-32 px-6">
      <div className="flex h-full items-center pt-5 justify-between gap-20">
        <div className="grid grid-cols-5 gap-10 min-w-1/3">
          <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
            QUESTION 1
          </Button>
          <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
            QUESTION 2
          </Button>
          <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
            QUESTION 3
          </Button>
          <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
            QUESTION 4
          </Button>
        </div>
        <div className="w-1/6 flex justify-end">
          <Button className="ml-4 bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl">
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(SpeakingFooter);

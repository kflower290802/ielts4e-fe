import { Button } from "@/components/ui/button";
import { memo } from "react";
import AudioPlayer from "./AudioPlayer";
const ListeningFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white h-32 px-6">
      <div className="absolute -top-5 left-0 right-0 w-full px-6">
        <AudioPlayer src="/images/PART1.mp3" />
      </div>
      <div className="flex h-full items-center pt-5 justify-between gap-20">
        <div className="grid grid-cols-5 gap-10 min-w-1/3">
          <div className="flex flex-col items-center gap-3">
            <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
              SECTION 1
            </Button>
            <span>0/10</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
              SECTION 2
            </Button>
            <span>0/10</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
              SECTION 3
            </Button>
            <span>0/10</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
              SECTION 4
            </Button>
            <span>0/10</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Button className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white">
            REVIEW TIME
          </Button>
          <span>10 minutes</span>
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

export default memo(ListeningFooter);

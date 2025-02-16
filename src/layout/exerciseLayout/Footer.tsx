import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
interface IProps {
  scores: {
    passage1: string;
    passage2: string;
    passage3: string;
  };
  currentPassage: number;
  setCurrentPassage: React.Dispatch<React.SetStateAction<number>>;
}
const Footer = ({ scores, currentPassage, setCurrentPassage }: IProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white h-28 px-6">
      <div className="flex h-full items-center justify-between gap-20">
        <div className="flex items-center gap-4">
          {["PASSAGE 1", "PASSAGE 2", "PASSAGE 3"].map((passage, idx) => (
            <div className="flex flex-col items-center gap-3">
              <Button
                key={passage}
                onClick={() => setCurrentPassage(idx + 1)}
                className={cn(
                  currentPassage === idx + 1
                    ? "bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
                    : "bg-white border-2 px-8 py-5 hover:bg-[#164C7E] hover:text-white"
                )}
              >
                {passage}
              </Button>
              <span className="ml-2 text-sm">
                {scores[`passage${idx + 1}` as keyof typeof scores]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center w-full justify-between gap-5">
          <div className="grid grid-cols-10 gap-3">
            {[...Array(13)].map((_, idx) => (
              <Button
                key={idx}
                className="h-8 w-8 rounded-full p-0 bg-[#D9D9D9] hover:bg-[#3C64CE] hover:text-white font-bold"
                onClick={() => {}}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
          <Button className="ml-4 bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl">
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import { Button } from "@/components/ui/button";
import { Clock, Mic } from "lucide-react";
import AudioPlayer from "../ListeningTest/components/AudioPlayer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SpeakingFooter from "./components/SpeakingFooter";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const SpeakingTest = () => {
  const { id } = useParams<{ id: string }>();
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1FFEF]">
      <Header timeLeft={3528} title="Speaking Test" isLoading={false} id={id} />
      <div className="flex-1 w-2/3 h-full p-6 bg-[#F5F5F5] mt-24 rounded-lg shadow-sm">
        <div className="mb-6 bg-[#164C7E] h-20 text-white flex gap-10 items-center justify-center rounded-lg">
          <h1 className="text-xl font-semibold">SPEAKING TEST</h1>
          <div className="font-medium">
            <p>Listen the question and record your answer.</p>
            <p>You have 10 seconds for preparing.</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center gap-5">
            <div className="border-2 border-black font-bold rounded-lg p-4">
              QUESTION 2
            </div>
            <div className="w-2/3">
              <AudioPlayer
                src="/images/PART1.mp3"
                title="ARE YOU READY TO START THE SPEAKING TEST?"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border-2 border-black p-4">
              <Clock className="h-5 w-5" />
              <span className="text-lg font-semibold text-[#9A2E2E]">
                04 : 48
              </span>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Button
              className={cn(
                " border-2 font-bold bg-[#F5F5F5]",
                showQuestion
                  ? "text-[#188F09] border-[#188F09] hover:bg-[#188F09] hover:text-white"
                  : "text-[#164C7E] border-[#164C7E] hover:bg-[#164C7E] hover:text-white"
              )}
              onClick={() => setShowQuestion(true)}
            >
              SHOW QUESTION
            </Button>
            {showQuestion && (
              <span>What do your family do in the last holiday ?</span>
            )}
          </div>
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#3C64CE] bg-[#D9D9D9]`}
              >
                <Mic className="w-8 h-8" />
              </div>
            </div>

            <p className="text-center  font-semibold">
              You have 2 minutes to speak...
            </p>
          </div>
        </div>

        <div className="flex w-full justify-center mt-8">
          <Button className="w-44 p-6 rounded-xl bg-[#3C64CE] text-white font-bold hover:bg-[#3C64CE]/80 transition-colors">
            START PRACTICE
          </Button>
        </div>
      </div>
      <SpeakingFooter />
    </div>
  );
};

export default SpeakingTest;

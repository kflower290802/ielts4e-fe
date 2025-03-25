import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPracticeSpeaking } from "./hooks/useSpeakingPractice";
import AudioPlayer from "./components/AudioPlayer";
import Recording from "./components/Recording";

const PracticeSpeaking = () => {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      refetch();
    }
    if (data) {
      setCompletedAudio([]);
      setShowQuestions(new Array(data.length).fill(false));
    }
  }, [id]);
  const { data, refetch } = useGetPracticeSpeaking(id ?? "");
  const [completedAudio, setCompletedAudio] = useState<number[]>([]);
  // State để theo dõi câu hỏi được hiển thị
  const [showQuestions, setShowQuestions] = useState<boolean[]>([]);
  const handleAudioComplete = (index: number) => {
    if (!completedAudio.includes(index)) {
      setCompletedAudio([...completedAudio, index]);
    }
  };

  const handleShowQuestion = (index: number) => {
    const newShowQuestions = [...showQuestions];
    newShowQuestions[index] = true;
    setShowQuestions(newShowQuestions);
  };
  return (
    <div className="flex pt-10 h-full justify-center">
      <div className="w-10/12  h-[550px] p-6 border border-black bg-[#F5F5F5] rounded-lg shadow-sm overflow-y-auto">
        <div className="mb-6 bg-[#164C7E] h-20 text-white flex gap-10 items-center justify-center rounded-lg">
          <h1 className="text-xl font-semibold">SPEAKING TEST</h1>
          <div className="font-medium">
            <p>Listen the question and record your answer.</p>
            <p>You have 10 seconds for preparing.</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {data?.map((item, index) => (
            <div className="flex flex-col gap-5 border-2 shadow rounded-lg p-5">
              <div className="flex items-center gap-16">
                <div className="border-2 border-black font-bold rounded-lg p-4">
                  QUESTION {index + 1}
                </div>
                <div className="w-2/3">
                <AudioPlayer
                    src={item.audio}
                    disabled={index > 0 && !completedAudio.includes(index - 1)}
                    onComplete={() => handleAudioComplete(index)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-10">
                <Button
                  className={cn(
                    " border-2 font-bold bg-[#F5F5F5]",
                    showQuestions[index]
                      ? "text-[#188F09] border-[#188F09] hover:bg-[#188F09] hover:text-white"
                      : "text-[#164C7E] border-[#164C7E] hover:bg-[#164C7E] hover:text-white"
                  )}
                  onClick={() => handleShowQuestion(index)}
                  disabled={!completedAudio.includes(index)}
                >
                  SHOW QUESTION
                </Button>
                {showQuestions[index] && <span>{item.question}</span>}
              </div>
              <Recording
                data={data}
                refetch={refetch}
                index={index}
                canRecord={completedAudio.includes(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeSpeaking;

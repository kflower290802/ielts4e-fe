import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAudioRecorder } from "@/context/record";
import { IExam } from "@/types/ExamType/exam";
import { ExamQuestion } from "@/types/speakingExam";
import { Mic } from "lucide-react";
interface IProps {
  data: IExam<ExamQuestion> | undefined;
  currentQuestion: number;
  refetch: () => void;
}
const Recording = ({ data, currentQuestion, refetch }: IProps) => {
  const { startRecording, isRecording, stopRecording, timeLeft, audioUrl } =
    useAudioRecorder();
  const examSpeakId = data?.exam[currentQuestion - 1].id || "";
  const examId = data?.exam[currentQuestion - 1].exam.id || "";
  return (
    <>
      {data?.exam[currentQuestion - 1]?.answer || audioUrl ? (
        <div className="text-center text-xl font-bold text-[#188F09]">
          Your answer has been saved.
        </div>
      ) : !isRecording && !audioUrl ? (
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
          <Button
            className="w-44 p-6 rounded-xl bg-[#3C64CE] text-white font-bold hover:bg-[#3C64CE]/80 transition-colors"
            onClick={() => startRecording(examSpeakId, examId)}
          >
            START RECORD
          </Button>
        </div>
      ) : (
        isRecording && (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="p-5 rounded-lg border-2">
                <Progress className="w-72" value={(timeLeft / 120) * 100} />
              </div>

              <p className="text-center  font-semibold">Speak now...</p>
            </div>

            <Button
              className="w-44 p-6 rounded-xl bg-[#3C64CE] text-white font-bold hover:bg-[#3C64CE]/80 transition-colors"
              onClick={() => {
                stopRecording(examSpeakId, examId);
                refetch();
              }}
            >
              STOP RECORD
            </Button>
          </div>
        )
      )}
    </>
  );
};

export default Recording;

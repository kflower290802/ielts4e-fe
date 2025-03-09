import { Button } from "@/components/ui/button";
import AudioPlayer from "../ListeningTest/components/AudioPlayer";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SpeakingFooter from "./components/SpeakingFooter";
import Header from "../components/Header";
import { useParams, useSearchParams } from "react-router-dom";
import { useSpeakingExam } from "./hooks/useSpeakingxam";
import Recording from "./components/Recording";
import { Skeleton } from "@/components/ui/skeleton";

const SpeakingTest = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const questionParam = searchParams.get("question") ?? "1";
  const [currentQuestion, setCurrentQuestion] = useState(
    questionParam ? parseInt(questionParam) : 1
  );
  const { data, refetch, isLoading } = useSpeakingExam(id ?? "");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (data?.exam) {
      const initialAnswers: Record<string, string> = {};
      data.exam.forEach((question) => {
        initialAnswers[question.id] = question.answer || "";
      });

      setAnswers(initialAnswers);
    }
  }, [data]);

  useEffect(() => {
    if (data?.exam) {
      const initialAnswers: Record<string, string> = {};
      data?.exam.forEach((question) => {
        initialAnswers[question.id] = question.answer || "";
      });

      setAnswers(initialAnswers);
    }
  }, [data]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (currentQuestion)
      newSearchParams.set("question", currentQuestion.toString());
    setSearchParams(newSearchParams);
  }, [currentQuestion, setSearchParams]);
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  const timeLeft = data?.remainingTime;
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1FFEF]">
      {timeLeft !== undefined && timeLeft !== null ? (
        <Header
          timeLeft={timeLeft}
          title="Speaking Test"
          isLoading={isLoading}
          id={id}
        />
      ) : (
        <div className="h-20 fixed top-0 w-full border-b bg-white shadow-lg flex justify-between p-4">
          <Skeleton className="h-12 w-56" />
          <Skeleton className="h-12 w-32" />
        </div>
      )}
      <div className="flex-1 w-2/3 h-full p-6 bg-[#F5F5F5] mt-24 rounded-lg shadow-sm">
        <div className="mb-6 bg-[#164C7E] h-20 text-white flex gap-10 items-center justify-center rounded-lg">
          <h1 className="text-xl font-semibold">SPEAKING TEST</h1>
          <div className="font-medium">
            <p>Listen the question and record your answer.</p>
            <p>You have 10 seconds for preparing.</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-16">
            <div className="border-2 border-black font-bold rounded-lg p-4">
              QUESTION {questionParam}
            </div>
            <div className="w-2/3">
              <AudioPlayer
                src={data?.exam[currentQuestion - 1]?.audio ?? ""}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                progress={progress}
                setProgress={setProgress}
              />
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
              <span>{data?.exam[currentQuestion - 1].questions}</span>
            )}
          </div>
          <Recording
            data={data}
            currentQuestion={currentQuestion}
            refetch={refetch}
          />
        </div>
      </div>
      <SpeakingFooter
        questions={data?.exam}
        refetch={refetch}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        answers={answers}
        setIsPlaying={setIsPlaying}
        setProgress={setProgress}
        id={id}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SpeakingTest;

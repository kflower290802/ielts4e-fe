import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useExamPassage } from "../ReadingTest/hooks/useExamPassage";
import ReadingFooter from "../ReadingTest/components/ReadingFooter";
const SpeakingTest = () => {
  const { id } = useParams<{ id: string }>();
  const { data, refetch, isLoading } = useExamPassage(id ?? "");
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3528);
  const passageParam = searchParams.get("passage") ?? "1";
  const [currentPassage, setCurrentPassage] = useState(
    passageParam ? parseInt(passageParam) : 1
  );
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (currentPassage)
      newSearchParams.set("passage", currentPassage.toString());
    setSearchParams(newSearchParams);
  }, [currentPassage, setSearchParams]);
  const questionsPerPage = 4;
  const questions =
    data?.exam[currentPassage - 1]?.questions || [];
  const startQuestion = (currentQuestionPage - 1) * questionsPerPage;
  const endQuestion = Math.min(
    startQuestion + questionsPerPage,
    questions.length
  );
  const totalQuestion = data?.exam
    .map((p) => p.questions)
    .flat().length;
  const visibleQuestions = questions.slice(startQuestion, endQuestion);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);
  const handleInput =
    (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: e.target.value,
      }));
    };
  const handleNextPage = () => {
    if (endQuestion < questions.length) {
      setCurrentQuestionPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentQuestionPage > 1) {
      setCurrentQuestionPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      <Header
        timeLeft={timeLeft}
        title='Reading Test'
        isLoading={isLoading}
        id = {id}
      />
      <div className="flex-1 my-24 h-full overflow-y-hidden">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <Card className="p-6 overflow-y-auto">
            {data?.exam && data.exam.length > 0 ? (
              <>
                <h2 className="mb-4 text-2xl font-bold">
                  {data.exam[currentPassage - 1].title ?? ""}
                </h2>
                <p className="mb-4">
                  {data.exam[currentPassage - 1].passage ?? ""}
                </p>
              </>
            ) : (
              <p>Loading passage...</p>
            )}
          </Card>

          <Card className="p-6 overflow-y-auto">
            <div className="mb-6 rounded-lg bg-blue-900 p-4 text-white">
              <h3 className="text-lg font-semibold">
                QUESTION {startQuestion + 1}
                {endQuestion === startQuestion + 1 ? "" : `- ${endQuestion}`}
              </h3>
              <p>Choose ONE WORD ONLY from the passage for each question</p>
            </div>

            <div className="space-y-6">
              {visibleQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={cn(
                    "space-y-2 flex border py-2 px-5 rounded-xl",
                    question.question.length > 50
                      ? "flex-col items-start gap-2"
                      : "gap-5 items-center"
                  )}
                >
                  <p className="text-sm">
                    {startQuestion + index + 1}. {question.question}
                  </p>
                  <Input
                    id={question.id}
                    value={answers[question.id] || ""}
                    onChange={handleInput(question.id)}
                    className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]"
                  />
                </div>
              ))}
            </div>
            {endQuestion < questions.length ? (
              <div
                className={cn(
                  currentQuestionPage > 1 ? "justify-between" : "justify-end",
                  "mt-4 flex items-center"
                )}
              >
                {currentQuestionPage > 1 ? (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handlePrevPage}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {startQuestion - questionsPerPage + 1} - {startQuestion}
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleNextPage}
                >
                  {endQuestion + 1}
                  {Math.min(
                    endQuestion + questionsPerPage,
                    questions.length
                  ) ===
                  endQuestion + 1
                    ? ""
                    : -Math.min(
                        endQuestion + questionsPerPage,
                        questions.length
                      )}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : currentQuestionPage > 1 ? (
              <div className="mt-4 flex justify-start">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handlePrevPage}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {startQuestion - questionsPerPage + 1} - {startQuestion}
                </Button>
              </div>
            ) : (
              ""
            )}
          </Card>
        </div>
      </div>
      <ReadingFooter
        setCurrentPassage={setCurrentPassage}
        passages={data?.exam ?? []}
        questions={questions}
        answers={answers}
        passageParam={passageParam}
        setCurrentQuestionPage={setCurrentQuestionPage}
        totalQuestion={totalQuestion}
      />
    </div>
  );
};

export default SpeakingTest;

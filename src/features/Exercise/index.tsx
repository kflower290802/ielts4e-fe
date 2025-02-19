import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStartExam } from "./hooks/useStartExam";
import { cn } from "@/lib/utils";
const Exercise = () => {
  const { id } = useParams<{ id: string }>();
  const { data, refetch, isLoading } = useStartExam(id ?? "");
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3528);
  const [currentPassage, setCurrentPassage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const questionsPerPage = 5;
  const questions =
    data?.exam?.examPassage[currentPassage - 1]?.questions || [];
  const startQuestion = (currentQuestion - 1) * questionsPerPage;
  const endQuestion = Math.min(
    startQuestion + (questionsPerPage - 1),
    questions.length
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleInput = (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: e.target.value,
      }));
    };
  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      <Header
        timeLeft={timeLeft}
        title={data?.exam.name ?? ""}
        isLoading={isLoading}
      />
      {/* Main Content */}
      <div className="flex-1 my-24 h-full overflow-y-hidden">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <Card className="p-6 overflow-y-auto">
            {data?.exam?.examPassage && data.exam.examPassage.length > 0 ? (
              <>
                <h2 className="mb-4 text-2xl font-bold">
                  {data.exam.examPassage[currentPassage - 1].title ?? ""}
                </h2>
                <p className="mb-4">
                  {data.exam.examPassage[currentPassage - 1].passage ?? ""}
                </p>
              </>
            ) : (
              <p>Loading passage...</p>
            )}
          </Card>

          {/* Questions */}
          <Card className="p-6 overflow-y-auto">
            <div className="mb-6 rounded-lg bg-blue-900 p-4 text-white">
              <h3 className="text-lg font-semibold">
                QUESTION {startQuestion + 1}{" "}
                {endQuestion === startQuestion + 1 ? "" : `-${endQuestion}`}
              </h3>
              <p>Choose ONE WORD ONLY from the passage for each question</p>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
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
                    {index + 1}. {question.question}
                  </p>
                  <Input
                    id={question.id}
                    value={answers[question.id] || ""}
                    onChange={handleInput(question.id)}
                    placeholder="Enter your answer"
                    className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]"
                  />
                </div>
              ))}
            </div>
            {questions.length <= 5 ? (
              ""
            ) : (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  {startQuestion + 6} - {endQuestion + 1}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
      <Footer
        currentPassage={currentPassage}
        setCurrentPassage={setCurrentPassage}
        passages={data?.exam.examPassage ?? []}
        questions={questions}
        answers={answers}
      />
    </div>
  );
};

export default Exercise;

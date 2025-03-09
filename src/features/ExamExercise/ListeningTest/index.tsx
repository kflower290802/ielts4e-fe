import Header from "../components/Header";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListeningFooter from "./components/ListeningFooter";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useListeningExamSection } from "./hooks/useListeningExamSection";
import { useListeningExamAnswers } from "./hooks/useListeningExamAnswer";
import { getStorage, setStorage } from "@/utils/storage";
import { Skeleton } from "@/components/ui/skeleton";

const ListeningTest = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDia, setOpenDia] = useState(false);
  const sectionParam = searchParams.get("section") ?? "1";
  const { mutateAsync: examListenAnswers } = useListeningExamAnswers();
  const [currentSection, setCurrentSection] = useState(
    sectionParam ? parseInt(sectionParam) : 1
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { data, refetch, isLoading } = useListeningExamSection(id ?? "");
  useEffect(() => {
    const isTesting = getStorage("isTesting");
    if (isTesting === "false") {
      setOpenDia(true);
      setStorage("isTesting", "true");
    }
  }, []);
  useEffect(() => {
    if (data?.exam) {
      const initialAnswers: Record<string, string> = {};
      data.exam.forEach((passage) => {
        passage.questions.forEach((question) => {
          initialAnswers[question.id] = question.answer || "";
        });
      });

      setAnswers(initialAnswers);
    }
  }, [data]);
  useEffect(() => {
    const sendAnswers = async () => {
      if (Object.keys(answers).length === 0) return;

      const answerArray = Object.entries(answers).map(
        ([questionId, answer]) => ({
          examId: id ?? "",
          examPassageQuestionId: questionId,
          answer,
        })
      );

      try {
        await examListenAnswers(answerArray);
        console.log("Answers sent successfully");
      } catch (error) {
        console.error("Failed to send answers:", error);
      }
    };

    const interval = setInterval(() => {
      sendAnswers();
    }, 20000); // Gửi mỗi 20 giây

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [answers, id, examListenAnswers]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (currentSection)
      newSearchParams.set("section", currentSection.toString());
    setSearchParams(newSearchParams);
  }, [currentSection, setSearchParams]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  const questions = data?.exam[currentSection - 1]?.questions || [];
  const totalQuestion = data?.exam.map((p) => p.questions).flat().length;
  const handleInput =
    (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: e.target.value,
      }));
    };
  const timeLeft = data?.remainingTime;
  // const handleAnswerChange = (id: number, value: string) => {
  //   setQuestions(
  //     questions.map((question) =>
  //       question.id === id ? { ...question, answer: value } : question
  //     )
  //   );
  // };
  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //   }
  // }, [id]);
  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      {timeLeft !== undefined && timeLeft !== null ? (
        <Header
          timeLeft={timeLeft}
          title="Listening Test"
          isLoading={isLoading}
          id={id}
        />
      ) : (
        <div className="h-20 w-full border-b bg-white shadow-lg flex justify-between p-4">
          <Skeleton className="h-12 w-56" />
          <Skeleton className="h-12 w-32" />
        </div>
      )}
      <div className="flex-1 my-20 h-full overflow-y-hidden relative">
        <div className="grid grid-cols-1 gap-6 p-6">
          <div className="p-6 overflow-y-auto">
            <div className="mb-6 rounded-lg bg-[#164C7E] p-4 text-white">
              <h3 className="text-lg font-semibold">QUESTION 1 -10</h3>
              <p>Choose ONE WORD ONLY from the passage for each question</p>
            </div>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className={cn(
                    "space-y-2 flex border py-2 px-5 rounded-xl",
                    question.question.length > 150
                      ? "flex-col items-start gap-2"
                      : "gap-5 items-center"
                  )}
                >
                  <p className="text-sm">
                    <span className="font-bold">{index + 1}, </span>
                    {question.question}
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
          </div>
        </div>
      </div>
      <ListeningFooter
        audio={data?.exam[currentSection - 1]?.audio}
        section={data?.exam ?? []}
        setCurrentSection={setCurrentSection}
        totalQuestion={totalQuestion}
        answers={answers}
        sectionParam={sectionParam}
        id={id}
        currentSection={currentSection}
      />
    </div>
  );
};

export default ListeningTest;

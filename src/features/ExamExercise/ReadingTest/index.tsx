import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import { useParams, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import ReadingFooter from "./components/ReadingFooter";
import { useExamAnswers } from "./hooks/useExamAnswer";
import { useReadingExamPassage } from "./hooks/useReadingExamPassage";
import { Skeleton } from "@/components/ui/skeleton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BlankSpace from "./components/BlankSpace";
import Word from "./components/Word";
import { EQuestionType } from "@/types/exam";
import SingleChoice from "./components/SingleChoice";
import { Checkbox } from "@/components/ui/checkbox";

const ReadingTest = () => {
  const { id } = useParams<{ id: string }>();
  const { data, refetch, isLoading } = useReadingExamPassage(id ?? "");
  const { mutateAsync: examAnswers } = useExamAnswers();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const [filledWordsByPassage, setFilledWordsByPassage] = useState<string[][]>(
    []
  );

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
    if (data?.exam && filledWordsByPassage.length === 0) {
      const initialFilledWords = data.exam.map((passage) =>
        Array(passage.questions.length).fill("")
      );
      setFilledWordsByPassage(initialFilledWords);
    }
  }, [data?.exam]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

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
        await examAnswers(answerArray);
        console.log("Answers sent successfully");
      } catch (error) {
        console.error("Failed to send answers:", error);
      }
    };

    const interval = setInterval(() => {
      sendAnswers();
    }, 20000);

    return () => clearInterval(interval);
  }, [answers, id, examAnswers]);

  const [searchParams, setSearchParams] = useSearchParams();
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

  const questionsPerPage = 20;
  const questions = data?.exam[currentPassage - 1]?.questions || [];
  const timeLeft = data?.remainingTime;
  const startQuestion = (currentQuestionPage - 1) * questionsPerPage;
  const endQuestion = Math.min(
    startQuestion + questionsPerPage,
    questions.length
  );
  const totalQuestion = data?.exam.map((p) => p.questions).flat().length;
  const visibleQuestions = questions.slice(startQuestion, endQuestion);

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

  const blankLength = useMemo(
    () =>
      (data?.exam[currentPassage - 1]?.passage ?? "").split("{blank}").length,
    [currentPassage, data?.exam]
  );

  const filledWords = filledWordsByPassage[currentPassage - 1] || [];

  const handleDrop = useCallback(
    (index: number, word: string) => {
      setFilledWordsByPassage((prev) => {
        const newFilledWordsByPassage = [...prev];
        const currentFilledWords = [
          ...(newFilledWordsByPassage[currentPassage - 1] || []),
        ];
        currentFilledWords[index] = word;
        newFilledWordsByPassage[currentPassage - 1] = currentFilledWords;
        return newFilledWordsByPassage;
      });
      console.log({ visibleQuestions, index });
      setAnswers((prev) => ({
        ...prev,
        [visibleQuestions[index]?.id]: word,
      }));
    },
    [currentPassage, visibleQuestions]
  );

  // Cập nhật filledWords từ question.answer khi cần
  useEffect(() => {
    if (filledWordsByPassage.length > 0) {
      setFilledWordsByPassage((prev) => {
        const newFilledWordsByPassage = [...prev];
        const currentFilledWords = [
          ...(newFilledWordsByPassage[currentPassage - 1] || []),
        ];
        visibleQuestions.forEach((question, index) => {
          if (!currentFilledWords[index]) {
            currentFilledWords[index] = question.answer || "";
          }
        });
        newFilledWordsByPassage[currentPassage - 1] = currentFilledWords;
        return newFilledWordsByPassage;
      });
    }
  }, [
    JSON.stringify(visibleQuestions),
    currentPassage,
    filledWordsByPassage.length,
  ]);

  const passageType = useMemo(
    () => data?.exam[currentPassage - 1].type,
    [currentPassage, data?.exam]
  );

  const passageContent = (data?.exam[currentPassage - 1].passage ?? "")
    .split("{blank}")
    .map((part, index) => (
      <span key={index}>
        {part}{" "}
        {index < blankLength - 1 && (
          <BlankSpace
            index={index}
            onDrop={handleDrop}
            word={filledWords[index]}
          />
        )}
      </span>
    ));

  const isHeadingQuestion = passageType === EQuestionType.HeadingPosition;
  const isSingleChoiceQuestion = passageType === EQuestionType.SingleChoice;
  const isBlankPassageDrag = passageType === EQuestionType.BlankPassageDrag;
  const isBlankPassageTextbox =
    passageType === EQuestionType.BlankPassageTextbox;
  const isMultipleChoiceQuestion = passageType === EQuestionType.MultipleChoice;

  const blankPassageLength =
    data?.exam[currentPassage - 1].blankPassage?.split("{blank}").length || 0;

  const questionPassageContent = data?.exam[currentPassage - 1].blankPassage
    ?.split("{blank}")
    .map((part, index) => (
      <span key={index}>
        {part}{" "}
        {index < blankPassageLength - 1 &&
          (isBlankPassageDrag || isBlankPassageTextbox) &&
          (isBlankPassageDrag ? (
            <BlankSpace
              index={index}
              onDrop={handleDrop}
              word={filledWords[index]}
            />
          ) : (
            <Input
              id={visibleQuestions[index].id}
              value={answers[visibleQuestions[index].id] || ""}
              onChange={handleInput(visibleQuestions[index].id)}
              className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]"
            />
          ))}
      </span>
    ));

  const visibleAnswers =
    isHeadingQuestion || isBlankPassageDrag
      ? visibleQuestions
          .flatMap((question) => question.answers)
          .filter((answer) => !filledWords.includes(answer.answer as never))
      : [];

  const handleSelectSingleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleCheckedChange = (questionId: string, answer: string) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [questionId]: prev[questionId].includes(answer)
          ? ((prev[questionId] as string[]) || []).filter((a) => a !== answer)
          : [...prev[questionId], answer],
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      {timeLeft !== undefined && timeLeft !== null ? (
        <Header
          timeLeft={timeLeft}
          title="Reading Test"
          isLoading={isLoading}
          id={id}
        />
      ) : (
        <div className="h-20 w-full border-b bg-white shadow-lg flex justify-between p-4">
          <Skeleton className="h-12 w-56" />
          <Skeleton className="h-12 w-32" />
        </div>
      )}
      <DndProvider backend={HTML5Backend}>
        <div className="flex-1 my-24 h-full overflow-y-hidden">
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <Card className="p-6 overflow-y-auto">
              {data?.exam && data.exam.length > 0 ? (
                <>
                  <h2 className="mb-4 text-2xl font-bold">
                    {data.exam[currentPassage - 1].title ?? ""}
                  </h2>
                  <p className="mb-4">
                    <p className="mb-4">{passageContent}</p>
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
                {isSingleChoiceQuestion && (
                  <div className="space-y-4">
                    {visibleQuestions.map((question, index) => (
                      <SingleChoice
                        question={question}
                        index={index}
                        onClick={handleSelectSingleAnswer}
                        currentAnswer={answers[question.id] as string}
                      />
                    ))}
                  </div>
                )}

                {isMultipleChoiceQuestion && (
                  <div className="space-y-4">
                    {visibleQuestions.map((question, index) => (
                      <div className="border rounded-md p-2">
                        <div className="flex flex-col space-y-2">
                          <p>
                            {index + 1}, {question.question}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {question.answers.map((answer) => (
                              <div
                                key={answer.id}
                                className="flex space-x-2 items-center"
                              >
                                <Checkbox
                                  checked={answers[question.id]?.includes(
                                    answer.answer
                                  )}
                                  onCheckedChange={() =>
                                    handleCheckedChange(
                                      question.id,
                                      answer.answer
                                    )
                                  }
                                />
                                <span>{answer.answer}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(isBlankPassageDrag || isBlankPassageTextbox) && (
                  <div>{questionPassageContent}</div>
                )}

                {(isHeadingQuestion || isBlankPassageDrag) && (
                  <div>
                    {isHeadingQuestion && (
                      <p className="text-lg font-bold ">List of Headings</p>
                    )}
                    <div className="flex space-x-2">
                      {visibleAnswers.flatMap((answer, index) => (
                        <Word key={index} answer={answer} />
                      ))}
                    </div>
                  </div>
                )}

                {!isHeadingQuestion &&
                  !isSingleChoiceQuestion &&
                  !isMultipleChoiceQuestion &&
                  !isBlankPassageDrag &&
                  !isBlankPassageTextbox &&
                  visibleQuestions.map((question, index) => (
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
                    {endQuestion + 1}-
                    {Math.min(endQuestion + questionsPerPage, questions.length)}
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
      </DndProvider>

      <ReadingFooter
        setCurrentPassage={setCurrentPassage}
        passages={data?.exam ?? []}
        questions={questions}
        answers={answers as Record<string, string>}
        passageParam={passageParam}
        setCurrentQuestionPage={setCurrentQuestionPage}
        totalQuestion={totalQuestion}
        id={id}
      />
    </div>
  );
};

export default ReadingTest;

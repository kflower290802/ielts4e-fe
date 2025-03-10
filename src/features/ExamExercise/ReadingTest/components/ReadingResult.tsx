import { Card } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReadingFooterResult from "./ReadingFooterResult";
import { useExamResult } from "../hooks/useExamResult";
import { Badge } from "@/components/ui/badge";
import { useReadingExamPassage } from "../hooks/useReadingExamPassage";
import { Route } from "@/constant/route";
import { EQuestionType } from "@/types/exam";
import SingleChoiceResult from "./SingleChoiceResult";

const ReadingResult = () => {
  const { idResult } = useParams<{ idResult: string }>();
  const { id } = useParams<{ id: string }>();
  const { data } = useReadingExamPassage(id ?? "");
  const { data: result } = useExamResult(idResult ?? "");
  const nav = useNavigate();
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

  const questionsPerPage = 4;
  const questions = data?.exam[currentPassage - 1]?.questions || [];

  const startQuestion = (currentQuestionPage - 1) * questionsPerPage;

  const endQuestion = Math.min(
    startQuestion + questionsPerPage,
    questions.length
  );
  const passageType = useMemo(
    () => data?.exam[currentPassage - 1].type,
    [currentPassage, data?.exam]
  );
  const visibleQuestions = questions.slice(startQuestion, endQuestion);
  const isSingleChoiceQuestion = passageType === EQuestionType.SingleChoice;
  const isHeadingQuestion = passageType === EQuestionType.HeadingPosition;
  const isBlankPassageDrag = passageType === EQuestionType.BlankPassageDrag;
  const blankLength = useMemo(
    () =>
      (data?.exam[currentPassage - 1]?.passage ?? "").split("{blank}").length,
    [currentPassage, data?.exam]
  );
  const isBlankPassageTextbox =
    passageType === EQuestionType.BlankPassageTextbox;
  const questionPassageContent = data?.exam[currentPassage - 1].blankPassage
    ?.split("{blank}")
    .map((part, index) => {
      const questionId = visibleQuestions[index]?.id;
      const questionSummary = result?.summary.find(
        (q) => q.questionId === questionId
      );

      return (
        <span key={index}>
          {part}{" "}
          {index < blankLength &&
            (isBlankPassageDrag || isBlankPassageTextbox) &&
            (isBlankPassageDrag ? (
              questionSummary?.isCorrect ? (
                <Badge
                  id={questionId}
                  className="w-32 h-8 text-center border-b-4 rounded-xl text-white bg-[#66B032]/80 border-[#66B032]"
                >
                  {questionSummary?.userAnswer}
                </Badge>
              ) : (
                <div className="flex items-center gap-5">
                  <Badge
                    id={questionId}
                    className="w-32 h-8 text-center border-b-4 rounded-xl text-white bg-red-300 border-red-500"
                  >
                    {questionSummary?.userAnswer}
                  </Badge>
                  <Badge
                    id={questionId}
                    className="w-32 h-8 text-center border-b-4 rounded-xl text-white bg-[#66B032]/70 border-[#66B032]"
                  >
                    {questionSummary?.correctAnswer}
                  </Badge>
                </div>
              )
            ) : questionSummary?.isCorrect ? (
              <Badge
                id={questionId}
                className="w-32 h-8 text-center border-b-4 rounded-xl text-[#164C7E] bg-[#66B032] border-[#164C7E]"
              >
                {questionSummary?.userAnswer}
              </Badge>
            ) : (
              <div className="flex items-center gap-5">
                <Badge
                  id={questionId}
                  className="w-32 h-8 text-center border-b-4 rounded-xl text-white bg-red-300 border-red-500"
                >
                  {questionSummary?.userAnswer}
                </Badge>
                <Badge
                  id={questionId}
                  className="w-32 h-8 text-center border-b-4 rounded-xl text-white bg-[#66B032]/70 border-[#66B032]"
                >
                  {questionSummary?.correctAnswer}
                </Badge>
              </div>
            ))}
        </span>
      );
    });

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
      <div
        className="px-6 flex items-center gap-4 text-lg font-semibold cursor-pointer"
        onClick={() => nav(Route.Exam)}
      >
        <ArrowLeft className="h-8 w-8" /> Back To Exam
      </div>
      <div className="flex-1 h-full overflow-y-hidden">
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
              {isSingleChoiceQuestion && (
                <div className="space-y-4">
                  {visibleQuestions.map((question, index) => {
                    const questionId = question.id;
                    const answerData = result?.summary.find(
                      (item) => item.questionId === questionId
                    );
                    return (
                      <SingleChoiceResult
                        question={question}
                        index={index}
                        userAnswer={answerData?.userAnswer}
                        correctAnswer={answerData?.correctAnswer}
                        isCorrect = {answerData?.isCorrect}
                      />
                    );
                  })}
                </div>
              )}
              {(isBlankPassageDrag || isBlankPassageTextbox) && (
                <div>{questionPassageContent}</div>
              )}
              {!isHeadingQuestion &&
                !isSingleChoiceQuestion &&
                !isBlankPassageDrag &&
                !isBlankPassageTextbox &&
                visibleQuestions.map((question, index) => {
                  const questionId = question.id;
                  const answerData = result?.summary.find(
                    (item) => item.questionId === questionId
                  );
                  return (
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
                      <Badge
                        className={cn(
                          "w-32 h-10 border-b-4 rounded-xl",
                          answerData?.userAnswer === ""
                            ? "bg-yellow-300 border-yellow-700 text-black hover:bg-yellow-400"
                            : answerData?.isCorrect
                            ? "bg-[#66B032] border-green-800 text-white hover:border-green-800"
                            : "bg-red-500 border-red-700 text-white hover:bg-red-400"
                        )}
                      >
                        {answerData?.userAnswer === ""
                          ? "Not answered"
                          : answerData?.userAnswer}
                      </Badge>
                    </div>
                  );
                })}
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
      <ReadingFooterResult
        result={result}
        setCurrentPassage={setCurrentPassage}
        passages={data?.exam ?? []}
        questions={questions}
        passageParam={passageParam}
        setCurrentQuestionPage={setCurrentQuestionPage}
      />
    </div>
  );
};

export default ReadingResult;

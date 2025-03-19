import { Card } from "@/components/ui/card";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import ReadingFooterResult from "./ReadingFooterResult";
import { useExamResult } from "../hooks/useExamResult";
import { Badge } from "@/components/ui/badge";
import { useReadingExamPassage } from "../hooks/useReadingExamPassage";
import { Route } from "@/constant/route";
import { EQuestionType } from "@/types/exam";
import SingleChoiceResult from "./SingleChoiceResult";
import QuestionHeader from "./QuestionHeader";
// import { Checkbox } from "@/components/ui/checkbox";

const ReadingResult = () => {
  let questionNumber = 0;
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

  useEffect(() => {
    setSearchParams({ passage: currentPassage.toString() });
  }, [currentPassage, setSearchParams]);

  const questionType = useMemo(
    () => data?.exam[currentPassage - 1]?.types,
    [currentPassage, data?.exam]
  );
  const calculateTotalQuestions = useCallback(() => {
    if (!data?.exam) return 0;

    return data.exam.reduce((total, passage) => {
      return (
        total +
        passage.types.reduce((typeTotal, type) => {
          return typeTotal + type.questions.length;
        }, 0)
      );
    }, 0);
  }, [data]);
  const totalQuestions = useMemo(
    () => calculateTotalQuestions(),
    [calculateTotalQuestions]
  );
  const questionPassageContent = (index: number, isDrag: boolean) => {
    if (!questionType || !questionType[index]) return null;

    const contentParts = questionType[index].content?.split("{blank}");

    const questions = questionType[index].questions || [];
    const blankLength = contentParts?.length - 1;

    return (
      <React.Fragment>
        <p className="mt-4 leading-loose">
          {contentParts.map((part, idx) => {
            if (idx >= blankLength) return <span key={idx}>{part}</span>; // Không thêm input nếu vượt quá 8
            questionNumber++;
            const question = questions[idx];
            const answerData = result?.summary.find(
              (item) => item.questionId === question?.id
            );
            return (
              <React.Fragment key={idx}>
                {isDrag ? (
                  <div className="space-y-2">
                    <span className="font-bold">{questionNumber}. </span>
                    {part}
                    <div className="flex gap-2 items-center">
                      <Badge
                        className={cn(
                          "w-32 h-9 border-b-4 rounded-xl",
                          answerData?.userAnswer === ""
                            ? "bg-white border-yellow-700 text-yellow-400 hover:bg-yellow-400"
                            : answerData?.isCorrect
                            ? "bg-[#66B032] hover:bg-[#66B032]/80  border-green-800 text-white hover:border-green-800"
                            : "bg-red-500 border-red-700 text-white hover:bg-red-400"
                        )}
                      >
                        {answerData?.userAnswer === ""
                          ? "Not answered"
                          : answerData?.userAnswer}
                      </Badge>
                      {!answerData?.isCorrect && (
                        <Badge className="w-32 h-9 border-b-4 rounded-xl hover:bg-[#66B032]/80 bg-[#66B032] border-green-800 text-white hover:border-green-800">
                          {answerData?.correctAnswer}
                        </Badge>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {part}
                    <span className="font-bold">{questionNumber}. </span>
                    <Badge
                      className={cn(
                        "w-32 h-9 border-b-4 rounded-xl",
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
                    {!answerData?.isCorrect && (
                      <Badge className="w-32 ml-2 h-9  border-b-4 rounded-xl hover:bg-[#66B032]/80 bg-[#66B032] border-green-800 text-white hover:border-green-800">
                        {answerData?.correctAnswer}
                      </Badge>
                    )}
                  </>
                )}{" "}
              </React.Fragment>
            );
          })}
        </p>
      </React.Fragment>
    );
  };
  const getQuestionRange = (questionType: any[], currentIndex: number) => {
    let start = 1;
    for (let i = 0; i < currentIndex; i++) {
      start += questionType[i]?.questions?.length || 0;
    }
    const end =
      start + (questionType[currentIndex]?.questions?.length || 0) - 1;
    return { start, end };
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
          <Card className="p-6 h-[75vh] overflow-y-auto">
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

          {/* <Card className="p-6 overflow-y-auto">
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
                        isCorrect={answerData?.isCorrect}
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
          </Card> */}
          <Card className="p-6 h-[75vh] overflow-y-auto">
            {questionType?.map((types, index) => {
              const { start, end } = getQuestionRange(questionType, index);
              const isHeadingQuestion =
                types.type === EQuestionType.HeadingPosition;
              const isSingleChoiceQuestion =
                types.type === EQuestionType.SingleChoice;
              const isBlankPassageDrag =
                types.type === EQuestionType.BlankPassageDrag;
              const isBlankPassageTextbox =
                types.type === EQuestionType.BlankPassageTextbox;
              const isMultipleChoiceQuestion =
                types.type === EQuestionType.MultipleChoice;
              if (isBlankPassageDrag || isBlankPassageTextbox) {
                return (
                  <div key={index}>
                    {isBlankPassageDrag ? (
                      <QuestionHeader
                        start={start}
                        end={end}
                        instruction="Drag in the CORRECT position"
                      />
                    ) : (
                      <QuestionHeader
                        start={start}
                        end={end}
                        instruction="Write the CORRECT answer"
                      />
                    )}
                    <div className="flex justify-between">
                      {questionPassageContent(index, isBlankPassageDrag)}
                    </div>
                  </div>
                );
              } else if (isSingleChoiceQuestion) {
                return (
                  <div className="space-y-4">
                    {questionType[index].questions.map((question, index) => {
                      const answerData = result?.summary.find(
                        (item) => item.questionId === question.id
                      );
                      return (
                        <SingleChoiceResult
                          question={question}
                          index={index}
                          userAnswer={answerData?.userAnswer}
                          correctAnswer={answerData?.correctAnswer}
                          isCorrect={answerData?.isCorrect}
                        />
                      );
                    })}
                  </div>
                );
              } else if (isMultipleChoiceQuestion) {
                <div className="space-y-4">
                  {questionType[index].questions.map((question, index) => {
                    questionNumber++;
                    return (
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
                                {/* <Checkbox
                                  checked={answers[question.id]?.includes(
                                    answer.answer
                                  )}

                                /> */}
                                <span>{answer.answer}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>;
              }
              // else if (isHeadingQuestion) {
              //   <div>
              //     {isHeadingQuestion && (
              //       <p className="text-lg font-bold ">List of Headings</p>
              //     )}
              //     <div className="flex space-x-2">
              //       {questionType[index].questions.map((question) =>
              //         question.answers.map((answer, idx) => (
              //           <Word key={idx} answer={answer} />
              //         ))
              //       )}
              //     </div>
              //   </div>;
              // }
            })}
          </Card>
        </div>
      </div>
      <ReadingFooterResult
        result={result}
        setCurrentPassage={setCurrentPassage}
        passages={data?.exam ?? []}
        totalQuestions={totalQuestions}
        passageParam={passageParam}
      />
    </div>
  );
};

export default ReadingResult;

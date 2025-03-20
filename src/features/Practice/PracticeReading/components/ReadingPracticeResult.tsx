import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import DialogPracticeConfirm from "./components/DialogPracticeConfirm";
import { Route } from "@/constant/route";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useReadingPracticePassage } from "../hooks/useReadingPracticePassage";
import { usePracticeResult } from "../hooks/usePracticeResult";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EQuestionType } from "@/types/ExamType/exam";
import QuestionPracticeHeader from "../../components/QuestionPracticeHeader";
import SingleChoicePracticeResult from "../../components/SingleChoicePracticeResult";
import ReadingFooterPracticeResult from "./ReadingFooterPracticeResult";
// import { Checkbox } from "@/components/ui/checkbox";
export default function PracticeReadingResult() {
  let questionNumber = 0;
  const { idResult } = useParams<{ idResult: string }>();
  const nav = useNavigate();
  const { data: result } = usePracticeResult(idResult ?? "");
  const { id } = useParams<{ id: string }>();
  const { data, refetch, isLoading } = useReadingPracticePassage(id ?? "");
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

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
                            ? "bg-yellow-300 border-yellow-700 text-black hover:bg-yellow-400"
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
  const handleExit = () => {
    nav(Route.Practice);
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
    <div className="h-full relative p-4 flex justify-between">
      {/* <DialogPracticeConfirm openDia={openDia} setOpenDia={setOpenDia} /> */}
      <Button
        variant="ghost"
        className="mb-4 w-fit hover:bg-[#F1FFEF] hover:border-0"
        size="sm"
        onClick={handleExit}
      >
        <ArrowLeft className="text-[#164C7E]" />
      </Button>
      <div className="flex flex-col gap-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Section */}
          <Card className="px-8 py-2 h-[74vh] overflow-y-auto">
            {data?.exam && data.exam.length > 0 ? (
              <>
                <h2 className="mb-4 text-2xl text-center font-bold">
                  {data.exam[currentPassage - 1].title ?? ""}
                </h2>
                <img
                  src="/images/writing.png"
                  alt="images"
                  className="object-contain"
                />
                <p className="mb-4">
                  <p className="mb-4">
                    {data.exam[currentPassage - 1].passage}
                  </p>
                </p>
              </>
            ) : (
              <p>Loading passage...</p>
            )}
          </Card>

          {/* Right Section */}
          <Card className="px-8 py-2 h-[74vh] overflow-y-auto">
            <CardContent className="pt-6 px-0">
              <div className="space-y-8">
                {questionType?.map((types, index) => {
                  const { start, end } = getQuestionRange(questionType, index);
                  // const isHeadingQuestion =
                  //   types.type === EQuestionType.HeadingPosition;
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
                          <QuestionPracticeHeader
                            start={start}
                            end={end}
                            instruction="Drag in the CORRECT position"
                          />
                        ) : (
                          <QuestionPracticeHeader
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
                        {questionType[index].questions.map(
                          (question, index) => {
                            const answerData = result?.summary.find(
                              (item) => item.questionId === question.id
                            );
                            return (
                              <SingleChoicePracticeResult
                                question={question}
                                index={index}
                                userAnswer={answerData?.userAnswer}
                                correctAnswer={answerData?.correctAnswer}
                                isCorrect={answerData?.isCorrect}
                              />
                            );
                          }
                        )}
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
                //   else if (isHeadingQuestion) {
                //     <div>
                //       {isHeadingQuestion && (
                //         <p className="text-lg font-bold ">List of Headings</p>
                //       )}
                //       <div className="flex space-x-2">
                //         {questionType[index].questions.map((question) =>
                //           question.answers.map((answer, idx) => (
                //             <WordPractice key={idx} answer={answer} />
                //           ))
                //         )}
                //       </div>
                //     </div>;
                //   }
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pagination */}
      </div>
      <ReadingFooterPracticeResult
        result={result}
        passages={data?.exam ?? []}
        totalQuestions={totalQuestions}
      />
    </div>
  );
}

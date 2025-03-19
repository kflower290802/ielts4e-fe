import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useReadingExamPassage } from "./hooks/useReadingExamPassage";
import Header from "../components/Header";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Skeleton } from "@/components/ui/skeleton";
import { EQuestionType } from "@/types/exam";
import BlankSpace from "./components/BlankSpace";
import { DndProvider } from "react-dnd";
import { Card } from "@/components/ui/card";
import ReadingFooter from "./components/ReadingFooter";
import SingleChoice from "../components/SingleChoice";
import { useExamAnswers } from "./hooks/useExamAnswer";
import { Checkbox } from "@/components/ui/checkbox";
import Word from "../components/Word";
import QuestionHeader from "../components/QuestionHeader";

const ReadingTest = () => {
  let questionNumber = 0;
  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const { mutateAsync: examAnswers } = useExamAnswers();
  const { data, refetch, isLoading } = useReadingExamPassage(id ?? "");
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
  const [filledWordsByQuestion, setFilledWordsByQuestion] = useState<
    string[][]
  >([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const passageParam = searchParams.get("passage") ?? "1";
  const [currentPassage, setCurrentPassage] = useState(
    passageParam ? parseInt(passageParam) : 1
  );
  useEffect(() => {
    setSearchParams({ passage: currentPassage.toString() });
  }, [currentPassage, setSearchParams]);

  const timeLeft = data?.remainingTime;

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

  useEffect(() => {
    if (data?.exam) {
      const initialAnswers: Record<string, string> = {};

      data.exam.forEach((passage) => {
        passage.types.forEach((type) => {
          type.questions.forEach((question) => {
            initialAnswers[question.id] = question.answer || "";
          });
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

  const handleDrop = useCallback(
    (blankIndex: number, word: string, questionTypeIndex: number) => {
      setFilledWordsByQuestion((prev) => {
        const newFilledWordsByPassage = [...prev];
        const currentFilledWords = [
          ...(newFilledWordsByPassage[currentPassage - 1] || []),
        ];
        currentFilledWords[blankIndex] = word; // Cập nhật từ tại vị trí blankIndex
        newFilledWordsByPassage[currentPassage - 1] = currentFilledWords;
        return newFilledWordsByPassage;
      });

      const questionId =
        questionType?.[questionTypeIndex]?.questions?.[blankIndex]?.id;
      if (questionId) {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: word,
        }));
      }
    },
    [currentPassage, questionType]
  );
  useEffect(() => {
    // Chỉ chạy khi có questionType và filledWordsByQuestion đã được khởi tạo
    if (!questionType || !data?.exam) return;

    setFilledWordsByQuestion((prev) => {
      // Khởi tạo mảng mới dựa trên prev
      const newFilledWordsByPassage =
        prev.length > 0
          ? [...prev]
          : Array(data.exam.length)
              .fill([])
              .map(() => []);

      // Lấy danh sách từ đã điền cho passage hiện tại
      const currentFilledWords =
        newFilledWordsByPassage[currentPassage - 1]?.length > 0
          ? [...newFilledWordsByPassage[currentPassage - 1]]
          : [];

      // Cập nhật answers cho từng question
      questionType.forEach((type, typeIndex) => {
        const answers = type.questions?.map((q) => q.answer || "") || [];

        answers.forEach((answer, answerIndex) => {
          // Chỉ cập nhật nếu chưa có giá trị tại vị trí này
          if (!currentFilledWords[answerIndex]) {
            currentFilledWords[answerIndex] = answer;
          }
        });
      });

      newFilledWordsByPassage[currentPassage - 1] = currentFilledWords;
      return newFilledWordsByPassage;
    });
  }, [questionType, currentPassage, data?.exam]);

  const handleInput =
    (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: e.target.value,
      }));
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
  const filledWords = filledWordsByQuestion[currentPassage - 1] || [];
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
            return (
              <React.Fragment key={idx}>
                {isDrag ? (
                  <>
                    <span className="font-bold">{questionNumber}. </span>
                    {part}
                    <BlankSpace
                      idx={idx}
                      index={index}
                      onDrop={handleDrop}
                      word={filledWords[idx]}
                    />
                  </>
                ) : (
                  <>
                    {part}
                    <span className="font-bold">{questionNumber}. </span>
                    <input
                      id={questions[idx]?.id}
                      value={answers[questions[idx]?.id] || ""}
                      onChange={handleInput(questions[idx]?.id)}
                      className="w-36 border-b-4 border px-3 rounded-xl text-[#164C7E] border-[#164C7E]"
                    />
                  </>
                )}{" "}
              </React.Fragment>
            );
          })}
        </p>
      </React.Fragment>
    );
  };
  const handleSelectSingleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
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
                    <p className="mb-4">
                      {data.exam[currentPassage - 1].passage}
                    </p>
                  </p>
                </>
              ) : (
                <p>Loading passage...</p>
              )}
            </Card>
            <Card className="p-6 overflow-y-auto">
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
                        {isBlankPassageDrag && (
                          <div className="flex flex-col space-x-2 h-fit rounded-lg shadow">
                            {questionType[index].questions.map((question) =>
                              question.answers.map((answer, idx) => (
                                <Word key={idx} answer={answer} />
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else if (isSingleChoiceQuestion) {
                  return (
                    <div className="space-y-4">
                      {questionType[index].questions.map((question, index) => (
                        <SingleChoice
                          question={question}
                          index={index}
                          onClick={handleSelectSingleAnswer}
                          currentAnswer={answers[question.id] as string}
                        />
                      ))}
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
                      );
                    })}
                  </div>;
                } else if (isHeadingQuestion) {
                  <div>
                    {isHeadingQuestion && (
                      <p className="text-lg font-bold ">List of Headings</p>
                    )}
                    <div className="flex space-x-2">
                      {questionType[index].questions.map((question) =>
                        question.answers.map((answer, idx) => (
                          <Word key={idx} answer={answer} />
                        ))
                      )}
                    </div>
                  </div>;
                }
              })}
            </Card>
          </div>
        </div>
      </DndProvider>
      <ReadingFooter
        setCurrentPassage={setCurrentPassage}
        passages={data?.exam ?? []}
        answers={answers as Record<string, string>}
        passageParam={passageParam}
        totalQuestions={totalQuestions}
        id={id}
      />
    </div>
  );
};

export default ReadingTest;

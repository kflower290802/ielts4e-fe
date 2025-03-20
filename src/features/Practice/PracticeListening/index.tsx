import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useListeningPracticeAnswers } from "./hooks/useListeningPracticeAnswer";
import { useListeningPracticeSection } from "./hooks/useListeningPracticeSection";
import { getStorage, setStorage } from "@/utils/storage";
import BlankPracticeSpace from "../components/BlankPracticeSpace";
import { EQuestionType } from "@/types/ExamType/exam";
import QuestionPracticeHeader from "../components/QuestionPracticeHeader";
import WordPractice from "../components/WordPractice";
import SingleChoicePractice from "../components/SingleChoicePractice";
import { Checkbox } from "@/components/ui/checkbox";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ListeningPracticeFooter from "./components/ListeningPracticeFooter";

const ListeningPractice = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDia, setOpenDia] = useState(false);
  const sectionParam = searchParams.get("section") ?? "1";
  const { mutateAsync: examListenAnswers } = useListeningPracticeAnswers();
  const [currentSection, setCurrentSection] = useState(
    sectionParam ? parseInt(sectionParam) : 1
  );
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const { data, refetch } = useListeningPracticeSection(id ?? "");
  const [filledWordsByQuestion, setFilledWordsByQuestion] = useState<
    string[][]
  >([]);

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
        await examListenAnswers(answerArray);
        console.log("Answers sent successfully");
      } catch (error) {
        console.error("Failed to send answers:", error);
      }
    };

    const interval = setInterval(() => {
      sendAnswers();
    }, 20000);

    return () => clearInterval(interval);
  }, [answers, id, examListenAnswers]);

  useEffect(() => {
    setSearchParams({ passage: currentSection.toString() });
  }, [currentSection, setSearchParams]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  const questionType = useMemo(
    () => data?.exam[currentSection - 1]?.types,
    [currentSection, data?.exam]
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
  const handleInput =
    (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: e.target.value,
      }));
    };
  const handleDrop = useCallback(
    (blankIndex: number, word: string, questionTypeIndex: number) => {
      setFilledWordsByQuestion((prev) => {
        const newFilledWordsByPassage = [...prev];
        const currentFilledWords = [
          ...(newFilledWordsByPassage[currentSection - 1] || []),
        ];
        currentFilledWords[blankIndex] = word; // Cập nhật từ tại vị trí blankIndex
        newFilledWordsByPassage[currentSection - 1] = currentFilledWords;
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
    [currentSection, questionType]
  );
  const questionNumberMap = useMemo(() => {
    if (!data?.exam) return {};
    const map: Record<string, number> = {};
    let currentNumber = 1;
    data.exam.forEach((passage) => {
      passage.types.forEach((type) => {
        type.questions.forEach((question) => {
          map[question.id] = currentNumber++;
        });
      });
    });
    return map;
  }, [data?.exam]);
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
  const filledWords = filledWordsByQuestion[currentSection - 1] || [];
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
            const questionId = questions[idx]?.id;
            const questionNumber = questionNumberMap[questionId] || 0;
            return (
              <React.Fragment key={idx}>
                {isDrag ? (
                  <>
                    <span className="font-bold">{questionNumber}. </span>
                    {part}
                    <BlankPracticeSpace
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
                      className="w-36 h-8 border-b-4 border px-3 rounded-xl text-[#164C7E] border-[#164C7E]"
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

  const handleSelectSingleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };
  const getQuestionRange = (questionType: any[], currentIndex: number) => {
    if (!questionType || !questionType[currentIndex])
      return { start: 1, end: 1 };

    const questions = questionType[currentIndex].questions || [];
    if (questions.length === 0) return { start: 1, end: 1 };

    // Lấy số thứ tự của câu hỏi đầu tiên và cuối cùng trong type hiện tại
    const start = questionNumberMap[questions[0].id] || 1;
    const end = questionNumberMap[questions[questions.length - 1].id] || start;

    return { start, end };
  };

  return (
    <div className="h-full relative p-4 flex flex-col justify-center items-center overflow-y-hidden">
      <DndProvider backend={HTML5Backend}>
        <div className="w-11/12 bg-white border border-black rounded-lg h-5/6 overflow-y-hidden">
          <div className="grid grid-cols-1 gap-6 p-6">
            <div className="overflow-y-auto">
              {questionType?.map((types, index) => {
                const { start, end } = getQuestionRange(questionType, index);
                const isHeadingQuestion =
                  types.type === EQuestionType.HeadingPosition;
                const isSingleChoiceQuestion =
                  types.type === EQuestionType.SingleChoice;
                const isBlankPassageDrag =
                  types.type === EQuestionType.BlankPassageDrag;
                const isBlankPassageImageTextbox =
                  types.type === EQuestionType.BlankPassageImageTextbox;
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
                        {isBlankPassageDrag && (
                          <div className="flex flex-col space-x-2 h-fit rounded-lg shadow">
                            {questionType[index].questions.map((question) =>
                              question.answers.map((answer, idx) => {
                                const answerDrag = {
                                  id: answer.id,
                                  question: answer.examListenQuestion,
                                  answer: answer.answer,
                                };
                                return (
                                  <WordPractice key={idx} answer={answerDrag} />
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else if (isSingleChoiceQuestion) {
                  return (
                    <div className="space-y-4">
                      {questionType[index].questions.map((question, index) => {
                        const questionNumber =
                          questionNumberMap[question.id] || index + 1;
                        return (
                          <SingleChoicePractice
                            question={question}
                            questionNumber={questionNumber}
                            onClick={handleSelectSingleAnswer}
                            currentAnswer={answers[question.id] as string}
                          />
                        );
                      })}
                    </div>
                  );
                } else if (isMultipleChoiceQuestion) {
                  <div className="space-y-4">
                    {questionType[index].questions.map((question, index) => {
                      const questionNumber =
                        questionNumberMap[question.id] || index + 1;
                      return (
                        <div className="border rounded-md p-2">
                          <div className="flex flex-col space-y-2">
                            <p>
                              {questionNumber}, {question.question}
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
                        question.answers.map((answer, idx) => {
                          const answerDrag = {
                            id: answer.id,
                            question: answer.examListenQuestion,
                            answer: answer.answer,
                          };
                          return <WordPractice key={idx} answer={answerDrag} />;
                        })
                      )}
                    </div>
                  </div>;
                } else if (isBlankPassageImageTextbox) {
                  return (
                    <>
                      <QuestionPracticeHeader
                        start={start}
                        end={end}
                        instruction="Complete the labels on the diagrams below with ONE or TWO WORDS taken from the reading passage.  "
                      />
                      <div className="flex gap-5">
                        <img
                          src={questionType[index].image}
                          alt="image type"
                          className="w-2/3"
                        />
                        <div className="flex flex-col gap-4 items-center">
                          {questionType[index].questions.map((question) => {
                            const questionNumber =
                              questionNumberMap[question.id] || index + 1;
                            return (
                              <div className="flex gap-2 items-center">
                                <span className="font-bold">
                                  {questionNumber}
                                </span>
                                <input
                                  id={question.id}
                                  value={answers[question.id] || ""}
                                  onChange={handleInput(question.id)}
                                  className="w-36 border-b-4 border px-3 rounded-xl text-[#164C7E] border-[#164C7E]"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </DndProvider>
      <ListeningPracticeFooter
        audio={data?.audio}
        section={data?.exam ?? []}
        totalQuestions={totalQuestions}
        answers={answers}
        sectionParam={sectionParam}
        id={id}
      />
    </div>
  );
};

export default ListeningPractice;

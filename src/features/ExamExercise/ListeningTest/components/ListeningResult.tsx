import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useListeningExamSection } from "../hooks/useListeningExamSection";
import { ArrowLeft } from "lucide-react";
import { Route } from "@/constant/route";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useExamResult } from "../../ReadingTest/hooks/useExamResult";
import ListeningFooterResult from "./ListeningFooterResult";
import { EQuestionType } from "@/types/exam";
import SingleChoiceListenResult from "./SingleChoiceListenResult";

const ListeningTestResult = () => {
  const nav = useNavigate();
  const { idResult } = useParams<{ idResult: string }>();
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get("section") ?? "1";
  const [currentSection, setCurrentSection] = useState(
    sectionParam ? parseInt(sectionParam) : 1
  );
  // const [answers, setAnswers] = useState<Record<string, string>>({});
  const { data, refetch } = useListeningExamSection(id ?? "");
  const { data: result } = useExamResult(idResult ?? "");
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
  const sectionType = useMemo(
    () => data?.exam[currentSection - 1]?.type,
    [currentSection, data?.exam]
  );
  const questions = data?.exam[currentSection - 1]?.questions || [];
  const isSingleChoiceQuestion = sectionType === EQuestionType.SingleChoice;

  const isMultipleChoiceQuestion = sectionType === EQuestionType.MultipleChoice;
  const totalQuestion = data?.exam.map((p) => p.questions).flat().length; 
  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      <div
        className="px-6 flex items-center gap-4 text-lg font-semibold cursor-pointer"
        onClick={() => nav(Route.Exam)}
      >
        <ArrowLeft className="h-8 w-8" /> Back To Exam
      </div>
      <div className="flex-1 my-20 h-full overflow-y-hidden relative">
        <div className="grid grid-cols-1 gap-6 p-6">
          <Card className="p-6 overflow-y-auto">
            <div className="mb-6 rounded-lg bg-blue-900 p-4 text-white">
              <h3 className="text-lg font-semibold">
                QUESTION {questions.length - questions.length + 1}-{" "}
                {questions.length}
              </h3>
              <p>Choose ONE WORD ONLY from the passage for each question</p>
            </div>

            <div className="space-y-6">
              {isSingleChoiceQuestion &&
                questions.map((question, index) => {
                  const questionId = question.id;
                  const answerData = result?.summary.find(
                    (item) => item.questionId === questionId
                  );
                  return (
                    <SingleChoiceListenResult
                      index={index}
                      question={question}
                      userAnswer={answerData?.userAnswer}
                      correctAnswer={answerData?.correctAnswer}
                      isCorrect={answerData?.isCorrect}
                    />
                  );
                })}
              {!isSingleChoiceQuestion &&
                !isMultipleChoiceQuestion &&
                questions.map((question, index) => {
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
                        {index + 1}. {question.question}
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
          </Card>
        </div>
      </div>
      <ListeningFooterResult
        section={data?.exam ?? []}
        setCurrentSection={setCurrentSection}
        totalQuestion={totalQuestion}
        sectionParam={sectionParam}
        result={result}
        idResult={idResult}
      />
    </div>
  );
};

export default ListeningTestResult;

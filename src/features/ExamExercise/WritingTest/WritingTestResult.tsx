import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Route } from "@/constant/route";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useExamPassage } from "../hooks/useExamPassage";
import WritingResultFooter from "./components/WritingResultFooter";
import { useExamResult } from "../hooks/useExamResult";
import { IExamWritingResult } from "@/types/ExamType/exam";
import { Button } from "@/components/ui/button";

const WritingTestResult = () => {
  const { idResult } = useParams<{ idResult: string }>();
  const { data: result } = useExamResult(idResult ?? "") as {
    data: IExamWritingResult;
  };
  const { id } = useParams<{ id: string }>();
  const { data, refetch } = useExamPassage(id ?? "");
  const [wordCount, setWordCount] = useState(0);
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const taskParam = searchParams.get("task") ?? "1";
  const [currentTask, setCurrentTask] = useState(
    taskParam ? parseInt(taskParam) : 1
  );
  const task = data?.exam.examPassage[currentTask - 1];
  const currentResult = result?.summary.find(
    (summaryItem) => summaryItem.questionId === task?.id
  );
  const answer = task?.answer?.answer;
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (currentTask) newSearchParams.set("task", currentTask.toString());
    setSearchParams(newSearchParams);
  }, [currentTask, setSearchParams]);
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  useEffect(() => {
    if (task?.id && answer) {
      const wordArray = answer
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(wordArray.length);
    } else {
      setWordCount(0);
    }
  }, [task, answer]);
  return (
    <div className="flex flex-col gap-5 min-h-screen bg-[#F1FFEF] overflow-y-hidden">
      <div
        className="px-6 flex items-center gap-4 text-lg font-semibold cursor-pointer"
        onClick={() => nav(Route.Exam)}
      >
        <ArrowLeft className="h-8 w-8" /> Back To Exam
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center h-[80vh] w-11/12 justify-center gap-4">
          {/* Left Card - Task Instructions */}
          <div className="w-1/2 border-2 flex flex-col justify-between h-full border-black rounded-lg overflow-auto bg-white p-6 shadow-sm">
            <span>
              <h2 className="text-xl font-bold mb-4">
                WRITING TASK {currentTask}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.exam.examPassage[currentTask - 1].content || "",
                }}
              />
            </span>

            {data?.exam.examPassage[currentTask - 1].image && (
              <div className="flex justify-center mb-4">
                <img
                  src={data?.exam.examPassage[currentTask - 1].image}
                  alt="Diagram showing flood protection methods"
                  className="border border-gray-200 rounded w-11/12 h-72 object-contain
                "
                />
              </div>
            )}
          </div>

          {/* Middle Card - Essay Text Area */}
          <div className="h-full w-2/3 flex border-2 bg-white border-black rounded-lg">
            <div className="w-1/2 rounded-xl overflow-hidden">
              <div className="p-6">
                <span className="font-medium">Words count: </span>
                <span className="pl-2">{wordCount}</span>

                {/* Essay Text Area */}
                <div className="flex-grow">
                  <div className="w-full h-[68vh] overflow-y-auto p-4 border border-gray-300 rounded-md">
                    <span>{answer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card - Scoring */}
            <div className="w-1/2 rounded-xl overflow-hidden overflow-y-auto">
              <div className="p-6 h-full">
                {/* Score Card */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white border-2 border-gray-200 rounded-lg px-10 py-4 shadow-sm">
                    <div className="text-6xl font-bold text-green-600 text-center">
                      {currentResult?.overallBandScore}
                    </div>
                    <div className="text-sm font-medium text-center mt-1">
                      OVERALL
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <ScoreCategory
                    title="Coherence and Cohesion:"
                    score={currentResult?.coherenceAndCohesion ?? 0}
                    detail={currentResult?.coherenceAndCohesionDetails ?? ''}
                  />
                  <ScoreCategory
                    title="Lexical Resource:"
                    score={currentResult?.lexicalResource ?? 0}
                    detail={currentResult?.lexicalResourceDetails ?? ''}
                  />
                  <ScoreCategory
                    title="Grammatical Range and Accuracy:"
                    score={currentResult?.grammaticalRangeAndAccuracy ?? 0}
                    detail={currentResult?.grammaticalRangeAndAccuracyDetails ?? ''}
                  />
                  <ScoreCategory
                    title="Task Achievement:"
                    score={currentResult?.taskResponse ?? 0}
                    detail={currentResult?.taskResponseDetails ?? ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WritingResultFooter
        setCurrentTask={setCurrentTask}
        currentTask={currentTask}
        tasks={data?.exam.examPassage}
      />
    </div>
  );
};
interface ScoreCategoryProps {
  title: string;
  score: number;
  detail: string;
}

function ScoreCategory({ title, score, detail }: ScoreCategoryProps) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex flex-col gap-3 items-center">
        <div className="flex gap-3 justify-between items-center">
          <div className="font-medium text-lg line-clamp-1">{title}</div>
          <div className="text-2xl font-bold text-green-600">
            {score?.toFixed(1)}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="border-[#164C7E] border-2 rounded-lg font-bold bg-white hover:bg-[#164C7E] hover:text-white px-6"
            onClick={() => setShowDetail(true)}
          >
            Details
          </Button>
        </div>
      </div>
      {showDetail && (
        <div className="flex flex-col mt-4">
          <div>
            <div className="flex items-center gap-2">
              <Check className="text-green-600" />
              <span className="text-sm font-medium">Detail:</span>
            </div>
            <div className="text-sm text-center text-gray-600">{detail}</div>
          </div>
          <Button
            className="border-[#164C7E] mt-5 w-32 mx-auto border-2 rounded-lg font-bold bg-white hover:bg-[#164C7E] hover:text-white px-6"
            onClick={() => setShowDetail(false)}
          >
            Hide
          </Button>
        </div>
      )}
    </div>
  );
}
export default WritingTestResult;

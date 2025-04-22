import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Route } from "@/constant/route";
import { useNavigate, useParams } from "react-router-dom";
import { useWritingPracticeById } from "../hooks/useWritingPracticeById";
import { IWritingSummary } from "@/types/PracticeType/practice";
import { usePracticeResult } from "../../PracticeReading/hooks/usePracticeResult";

const WritingPracticeResult = () => {
  const [wordCount, setWordCount] = useState(184);
  const { idResult } = useParams<{ idResult: string }>();
  const { data: result } = usePracticeResult(idResult ?? "") as {
    data: IWritingSummary;
  };
  const { id } = useParams<{ id: string }>();
  const { data, refetch } = useWritingPracticeById(id ?? "");
  const nav = useNavigate();
  const answer = data?.answer?.answer;
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);
  useEffect(() => {
    if (answer) {
      const text = answer;
      const wordArray = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(wordArray.length);
    } else {
      setWordCount(0);
    }
  }, [answer]);
  const handleExit = () => {
    nav(Route.Practice);
  };

  return (
    <div className="h-full w-full relative p-4 flex justify-between">
      <Button
        variant="ghost"
        className="mb-4 w-fit hover:bg-[#F1FFEF] hover:border-0"
        size="sm"
        onClick={handleExit}
      >
        <ArrowLeft className="text-[#164C7E]" />
      </Button>
      <div className="flex justify-center items-center">
        <div className="flex items-center h-[80vh] w-11/12 justify-center gap-4">
          {/* Left Card - Task Instructions */}
          <div className="w-1/3 border-2 border-black h-full rounded-lg bg-white overflow-y-auto">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">WRITING TASK</h1>
              <span>{data?.content}</span>
              <div className="w-full">
                <img
                  src={data?.image}
                  alt="Diagram showing flood protection methods"
                  className="w-full mx-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Middle Card - Essay Text Area */}
          <div className="h-full w-2/3 flex border-2 bg-white border-black rounded-lg">
            <div className="w-1/2 rounded-xl overflow-hidden">
              <div className="p-6">
                <span className="font-medium">Words count: </span>
                <span>{wordCount}</span>
                {/* Essay Text Area */}
                <div className="flex-grow">
                  <div className="w-full h-[68vh] overflow-y-auto p-4 border border-gray-300 rounded-md">
                    <span>{answer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card - Scoring */}
            <div className="w-1/2 h-[93%] rounded-xl overflow-hidden overflow-y-auto">
              <div className="p-6 h-full">
                {/* Score Card */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white border-2 border-gray-200 rounded-lg px-10 py-4 shadow-sm">
                    <div className="text-6xl font-bold text-green-600 text-center">
                      {result?.score}
                    </div>
                    <div className="text-sm font-medium text-center mt-1">
                      OVERALL
                    </div>
                  </div>
                </div>

                {/* Scoring Categories */}
                {/* <div className="space-y-4">
                  <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-lg">
                        Coherence and Cohesion:
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-green-600">
                          {result?.coherenceAndCohesion}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-lg">
                        Lexical Resource:
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-green-600">
                          {result?.lexicalResource}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-lg">
                        Grammatical Range and Accuracy:
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-green-600">
                          {result?.coherenceAndCohesion}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-lg">
                        Task Achievement:
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-green-600">
                          {result?.taskResponse}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="space-y-4">
                  <ScoreCategory
                    title="Coherence and Cohesion:"
                    score={result?.coherenceAndCohesion}
                    detail={result?.coherenceAndCohesionDetails}
                  />
                  <ScoreCategory
                    title="Lexical Resource:"
                    score={result?.lexicalResource}
                    detail={result?.lexicalResourceDetails}
                  />
                  <ScoreCategory
                    title="Grammatical Range and Accuracy:"
                    score={result?.grammaticalRangeAndAccuracy}
                    detail={result?.grammaticalRangeAndAccuracyDetails}
                  />
                  <ScoreCategory
                    title="Task Achievement:"
                    score={result?.taskResponse}
                    detail={result?.taskResponseDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
export default WritingPracticeResult;

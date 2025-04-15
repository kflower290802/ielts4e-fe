import { useParams } from "react-router-dom";
import { useExamPassage } from "@/features/ExamExercise/hooks/useExamPassage";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import StepPractice from "../components/stepPractice";

const CreatePracticeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, refetch } = useExamPassage(id ?? "");
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
  const passages = data?.exam?.examPassage;
  return (
    <div className="h-full w-full p-8 space-y-5">
      <div className="w-9/12 mx-auto">
        <StepPractice step={1} />
      </div>
      <div className="w-10/12 mx-auto bg-white min-h-[60vh] rounded-lg shadow-md p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-center mb-4 text-xl font-bold">
            Create Passage Detail
          </h1>
          <Button className="border-2 flex gap-3 border-[#164C7E] font-bold bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
            Create New Passage
          </Button>
        </div>
        {passages?.map((passage, index) => (
            passages.length = 0 && (
                <div className="text-center">There are currently no passages available.</div>
            )
        ))}
      </div>
    </div>
  );
};

export default CreatePracticeDetail;

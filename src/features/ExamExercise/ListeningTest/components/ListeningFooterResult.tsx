import { Button } from "@/components/ui/button";
import { memo } from "react";
import { ExamSection } from "@/types/listeningExam";
import { cn } from "@/lib/utils";
import { IExamResult } from "@/types/exam";
import { Badge } from "@/components/ui/badge";
interface IProps {
  section: ExamSection[];
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  totalQuestion: number | undefined;
  sectionParam: string;
  result: IExamResult | undefined;
  idResult: string | undefined;
}
const ListeningFooterResult = ({
  section,
  setCurrentSection,
  sectionParam,
  result,
}: IProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white h-32 px-6">
      <div className="flex h-full items-center pt-5 justify-between gap-20">
        <div className="grid grid-cols-5 gap-10 min-w-1/3">
          {section.map((sectionitem, idx) => (
            <div
              className="flex flex-col items-center gap-3"
              key={sectionitem.id}
            >
              <Button
                onClick={() => setCurrentSection(idx + 1)}
                className={cn(
                  Number(sectionParam) === idx + 1
                    ? "bg-white border-2 border-[#66B032] text-[#66B032] font-bold px-8 py-5 hover:bg-[#66B032] hover:text-white"
                    : "bg-white border-2 px-8 py-5 hover:bg-[#66B032] hover:text-white"
                )}
              >
                SECTION {idx + 1}
              </Button>
            </div>
          ))}
        </div>
        <div className="w-1/6 flex justify-end">
          <Badge className="ml-4 bg-[#66B032] py-2 px-4 hover:bg-[#66B032]/80 text-base text-white font-bold rounded-xl">
            Score: {result?.score.toFixed(2)} / 10
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default memo(ListeningFooterResult);

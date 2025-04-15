import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExamPassage } from "@/types/ExamType/exam";
interface IProps {
  currentTask: number;
  setCurrentTask: React.Dispatch<React.SetStateAction<number>>;
  tasks: ExamPassage[] | undefined;
}
const WritingResultFooter = ({ setCurrentTask, tasks, currentTask }: IProps) => {
  return (
    <div className="h-12 px-16 flex justify-between items-center">
      <div className="flex h-full items-center justify-between gap-20">
        <div className="grid grid-cols-5 gap-10 min-w-1/3">
          {tasks?.map((task, index) => (
            <div className="flex flex-col items-center gap-3" key={task.id}>
              <Button
                onClick={() => setCurrentTask(index + 1)}
                className={cn(
                  "border-2 border-[#188F09] bg-white font-bold hover:bg-[#188F09] hover:text-white text-[#188F09]", currentTask === index + 1 && 'bg-[#188F09] text-white'
                )}
              >
                TASK {index + 1}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WritingResultFooter;

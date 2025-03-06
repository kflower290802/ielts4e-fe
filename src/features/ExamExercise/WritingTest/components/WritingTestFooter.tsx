import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IContent } from "@/types/writingExam";
interface IProps {
  setCurrentTask: React.Dispatch<React.SetStateAction<number>>;
  tasks: IContent[] | undefined;
  currentTask: number;
  answers: Record<string, string>;
}
const WritingTestFooter = ({
  answers,
  setCurrentTask,
  tasks,
  currentTask,
}: IProps) => {
  return (
    <div className="h-20 px-6 flex justify-between items-center">
      {/* <DialogSubmitConfirm
        openDia={openDia}
        setOpenDia={setOpenDia}
        totalQuestion={totalQuestion}
        answers={answers}
        id={id}
      /> */}
      <div className="flex h-full items-center justify-between gap-20">
        <div className="grid grid-cols-5 gap-10 min-w-1/3">
          {tasks?.map((task, index) => (
            <div className="flex flex-col items-center gap-3" key={task.id}>
              <Button
                onClick={() => setCurrentTask(index + 1)}
                className={cn(
                  Number(currentTask) === index + 1
                    ? "bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
                    : "bg-white border-2 px-8 py-5 hover:bg-[#164C7E] hover:text-white",
                  answers[task.id] && "border-2 border-[#188F09] text-[#188F09]"
                )}
              >
                TASK {index + 1}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/6 flex justify-end">
        <Button
          className="ml-4 bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl"
          // onClick={() => {
          //   setOpenDia(true);
          // }}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default WritingTestFooter;

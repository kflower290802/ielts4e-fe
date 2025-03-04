import { Button } from "@/components/ui/button";

const WritingTestFooter = () => {
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
          <div className="flex flex-col items-center gap-3">
            <Button
              // onClick={() => setCurrentPassage(idx + 1)}
              className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
            >
              TASK 1
            </Button>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button
              // onClick={() => setCurrentPassage(idx + 1)}
              className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
            >
              TASK 2
            </Button>
          </div>
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

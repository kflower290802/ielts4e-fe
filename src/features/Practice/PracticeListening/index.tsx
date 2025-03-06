import { Input } from "@/components/ui/input";

const ListeningPractice = () => {
  return (
    <div className="h-full p-4 flex flex-col justify-center items-center overflow-y-hidden">
      <div className="w-11/12 bg-white border border-black rounded-lg h-5/6 overflow-y-hidden">
        <div className="grid grid-cols-1 gap-6 p-6">
          <div className="overflow-y-auto">
            <div className="mb-6 rounded-lg bg-[#164C7E] p-4 text-white">
              <h3 className="text-lg font-semibold">QUESTION 1 -10</h3>
              <p>Choose ONE WORD ONLY from the passage for each question</p>
            </div>
            <div className="mb-6">
              <div className="space-y-2 flex border py-2 px-5 rounded-xl gap-5 items-center">
                <p className="text-sm">
                  <span className="font-bold">1, </span>
                  Sometimes, somebody do something
                </p>
                <Input className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]" />
              </div>
            </div>
            <div className="mb-6">
              <div className="space-y-2 flex border py-2 px-5 rounded-xl gap-5 items-center">
                <p className="text-sm">
                  <span className="font-bold">2, </span>
                  Sometimes, somebody do something
                </p>
                <Input className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]" />
              </div>
            </div>
            <div className="mb-6">
              <div className="space-y-2 flex border py-2 px-5 rounded-xl gap-5 items-center">
                <p className="text-sm">
                  <span className="font-bold">3, </span>
                  Sometimes, somebody do something
                </p>
                <Input className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]" />
              </div>
            </div>
            <div className="mb-6">
              <div className="space-y-2 flex border py-2 px-5 rounded-xl gap-5 items-center">
                <p className="text-sm">
                  <span className="font-bold">4, </span>
                  Sometimes, somebody do something
                </p>
                <Input className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningPractice;

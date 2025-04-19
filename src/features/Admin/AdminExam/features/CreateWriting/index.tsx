import { Button } from "@/components/ui/button";
import Step from "../CreateReading/components/step";
import { useEffect, useState } from "react";
import DialogCreatePart from "./components/DialogCreatePart";
import { useParams } from "react-router-dom";
import { useGetFullExamDetail } from "../CreateReading/hooks/useGetFullExamDetail";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CreateWritingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [openDiaCreatePart, setOpenDiaCreatePart] = useState<boolean>(false);
  const { data, refetch } = useGetFullExamDetail(id ?? "");
  const passages = data?.examPassage;
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
  return (
    <div className="h-full w-full p-8 space-y-5">
      <DialogCreatePart
        id={id}
        openDia={openDiaCreatePart}
        setOpenDia={setOpenDiaCreatePart}
        refetch={refetch}
      />
      <div className="w-9/12 mx-auto">
        <Step step={1} />
      </div>
      <div className="w-10/12 mx-auto bg-white h-[70vh] overflow-y-auto rounded-lg shadow-md p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-center mb-4 text-xl font-bold">
            Create Part Detail
          </h1>
          <Button
            className="border-2 flex gap-3 border-[#164C7E] font-bold bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]"
            onClick={() => setOpenDiaCreatePart(true)}
          >
            Create New Part
          </Button>
        </div>
        {passages && passages.length > 0 ? (
          passages.map((passage, index) => (
            <Accordion
              type="single"
              collapsible
              className="w-full bg-[#F1FFEF] border-2 border-[#188F09] rounded-lg px-4 mt-4"
            >
              <AccordionItem value="item-1" key={passage.id}>
                <AccordionTrigger className="flex gap-3 items-center font-bold">
                  <span>Part {index + 1}:</span> <span>{passage.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <span>{passage.content}</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        ) : (
          <div className="text-center text-black">
            There are currently no Part available.
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateWritingDetail;

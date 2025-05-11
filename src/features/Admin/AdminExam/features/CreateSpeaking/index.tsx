import { Button } from "@/components/ui/button";
import Step from "../CreateReading/components/step";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFullExamDetail } from "../CreateReading/hooks/useGetFullExamDetail";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DialogCreatePart from "./components/DialogCreatePart";
import DialogCreateQuestion from "./components/DialogCreateQuestion";
const CreateSpeakingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [openDiaCreatePart, setOpenDiaCreatePart] = useState<boolean>(false);
  const [openDiaCreateQuestion, setOpenDiaCreateQuestion] =
    useState<boolean>(false);
  const [idPart, setIdPart] = useState("");
  const { data, refetch } = useGetFullExamDetail(id ?? "");
  const passages = data?.examPassage;
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
  const handleOpenCreateQuestion = (idPart: string) => {
    setIdPart(idPart);
    setOpenDiaCreateQuestion(true);
  };
  return (
    <div className="h-full w-full p-8 space-y-5">
      <DialogCreatePart
        id={id}
        openDia={openDiaCreatePart}
        setOpenDia={setOpenDiaCreatePart}
        refetch={refetch}
      />
      <DialogCreateQuestion
        id={idPart}
        openDia={openDiaCreateQuestion}
        setOpenDia={setOpenDiaCreateQuestion}
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
                  {passage.questions.length < 3 && (
                    <div className="flex justify-end">
                      <Button
                        className="border-2 flex gap-3 border-[#188F09] font-bold bg-white text-[#188F09] hover:text-white hover:bg-[#188F09]"
                        onClick={() => handleOpenCreateQuestion(passage.id)}
                      >
                        Create New Question
                      </Button>
                    </div>
                  )}
                  {passage.questions && passage.questions.length > 0 ? (
                    passage.questions.map((question, index) => (
                      <div className="w-full flex gap-4 justify-between items-center font-bold text-black bg-yellow-200 border-2 border-[#188F09] rounded-lg p-3 mt-4">
                        <span>Question {index + 1}:</span>
                        <audio
                          controls
                          src={question.question}
                          className="w-10/12"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-black">
                      There are currently no Question available.
                    </div>
                  )}
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

export default CreateSpeakingDetail;

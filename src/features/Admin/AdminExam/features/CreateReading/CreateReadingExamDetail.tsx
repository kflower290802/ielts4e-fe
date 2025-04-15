import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetFullExamDetail } from "../../hooks/useGetFullExamDetail";
import Step from "../../components/step";
import DialogCreatePassage from "../../components/DialogCreatePassage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DialogCreateType from "../../components/DialogCreateType";
import { EQuestionType } from "@/types/ExamType/exam";
const questionTypeDisplayNames: Record<string, string> = {
  [EQuestionType.TextBox]: "Text Box",
  [EQuestionType.MultipleChoice]: "Multiple Choice",
  [EQuestionType.SingleChoice]: "Single Choice",
  [EQuestionType.TexBoxPosition]: "Text Box Position",
  [EQuestionType.BlankPassageDrag]: "Blank Passage Drag",
  [EQuestionType.BlankPassageTextbox]: "Blank Passage Textbox",
  [EQuestionType.BlankPassageImageTextbox]: "Blank Passage Image Textbox",
};
const CreateReadingExamDetail = () => {
  const [openDiaCreatePassage, setOpenDiaCreatePassage] =
    useState<boolean>(false);
  const [openDiaCreateType, setOpenDiaCreateType] = useState<boolean>(false);
  const [idPassage, setIdPassage] = useState("");
  const { id } = useParams<{ id: string }>();
  const { data, refetch } = useGetFullExamDetail(id ?? "");
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
  const handleOpenCreateType = (idPassage: string) => {
    setIdPassage(idPassage);
    setOpenDiaCreateType(true);
  };
  const passages = data?.examPassage;
  return (
    <div className="h-full w-full p-8 space-y-5">
      <DialogCreatePassage
        openDia={openDiaCreatePassage}
        setOpenDia={setOpenDiaCreatePassage}
        id={id}
        refetch={refetch}
      />
      <DialogCreateType
        openDia={openDiaCreateType}
        setOpenDia={setOpenDiaCreateType}
        id={idPassage}
        refetch={refetch}
      />
      <div className="w-9/12 mx-auto">
        <Step step={1} />
      </div>
      <div className="w-10/12 mx-auto bg-white min-h-[60vh] rounded-lg shadow-md p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-center mb-4 text-xl font-bold">
            Create Passage Detail
          </h1>
          <Button
            className="border-2 flex gap-3 border-[#164C7E] font-bold bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]"
            onClick={() => setOpenDiaCreatePassage(true)}
          >
            Create New Passage
          </Button>
        </div>

        {passages && passages.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="w-full bg-[#F1FFEF] border-2 border-[#188F09] rounded-lg px-4 mt-4"
          >
            {passages.map((passage, index) => (
              <AccordionItem value="item-1" key={passage.id}>
                <AccordionTrigger className="flex gap-3 items-center font-bold">
                  <span>Passage {index + 1}:</span> <span>{passage.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end">
                    <Button
                      className="border-2 flex gap-3 border-blue-500 font-bold bg-white text-blue-500 hover:text-white hover:bg-blue-500"
                      onClick={() => handleOpenCreateType(passage.id)}
                    >
                      Create New Type Question
                    </Button>
                  </div>
                  {passage.types && passage.types.length > 0 ? (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full bg-[#F1FFEF] border-2 border-[#164C7E] rounded-lg px-4 mt-4"
                    >
                      {passage.types.map((type) => (
                        <AccordionItem value="item-1" key={type.id}>
                          <AccordionTrigger className="flex gap-3 items-center font-bold">
                            <span>Type:</span> <span>{questionTypeDisplayNames[type.type] || type.type}</span>
                          </AccordionTrigger>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center text-black">
                      There are currently no Type Question available.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center text-black">
            There are currently no passages available.
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateReadingExamDetail;

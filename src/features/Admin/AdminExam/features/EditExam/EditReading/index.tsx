import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EQuestionType } from "@/types/ExamType/exam";
import { useGetFullExamDetail } from "../../CreateReading/hooks/useGetFullExamDetail";
import StepEdit from "../components/stepEdit";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DialogDeletePassage from "./components/DialogDeletePassage";
import DialogEditPassage from "./components/DialogEditPassage";
const questionTypeDisplayNames: Record<string, string> = {
  [EQuestionType.TextBox]: "Text Box",
  [EQuestionType.MultipleChoice]: "Multiple Choice",
  [EQuestionType.SingleChoice]: "Single Choice",
  [EQuestionType.TexBoxPosition]: "Text Box Position",
  [EQuestionType.BlankPassageDrag]: "Blank Passage Drag",
  [EQuestionType.BlankPassageTextbox]: "Blank Passage Textbox",
  [EQuestionType.BlankPassageImageTextbox]: "Blank Passage Image Textbox",
};
const EditReadingExam = () => {
  const [openDiaDeletePassage, setOpenDiaDeletePassage] =
    useState<boolean>(false);
  const [openDiaEditPassage, setOpenDiaEditPassage] = useState<boolean>(false);
  const [selectedPassage, setSelectedPassage] = useState<{
    id: string;
    title: string;
    passage: string;
  } | null>(null);
  const [openDiaCreateType, setOpenDiaCreateType] = useState<boolean>(false);
  const [openDiaCreateQuestion, setOpenDiaCreateQuestion] =
    useState<boolean>(false);
  const [idPassage, setIdPassage] = useState("");
  const [idType, setIdType] = useState("");
  const [type, setType] = useState("");
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
  const handleOpenCreateQuestion = (idType: string, type: string) => {
    setIdType(idType);
    setType(type);
    setOpenDiaCreateQuestion(true);
  };
  const passages = data?.examPassage;
  const handleOpenDiaDeletePassage = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpenDiaDeletePassage(true);
    setIdPassage(id);
    e.stopPropagation();
  };
  const handleOpenEditPassage = (
    passage: { id: string; title: string; passage: string },
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSelectedPassage(passage);
    setOpenDiaEditPassage(true);
    e.stopPropagation();
  };

  return (
    <div className="h-full w-full p-8 space-y-5">
      <DialogEditPassage
        openDia={openDiaEditPassage}
        setOpenDia={setOpenDiaEditPassage}
        passageData={selectedPassage}
        refetch={refetch}
      />
      {/* <DialogCreateType
        openDia={openDiaCreateType}
        setOpenDia={setOpenDiaCreateType}
        id={idPassage}
        refetch={refetch}
      />
      <DialogCreateQuestion
        openDia={openDiaCreateQuestion}
        setOpenDia={setOpenDiaCreateQuestion}
        id={idType}
        type={type}
        refetch={refetch}
      /> */}
      <DialogDeletePassage
        openDeletePassage={openDiaDeletePassage}
        id={idPassage}
        setOpenDeletePassage={setOpenDiaDeletePassage}
        refetch={refetch}
      />
      <div className="w-9/12 mx-auto">
        <StepEdit step={1} />
      </div>
      <div className="w-10/12 mx-auto bg-white h-[70vh] overflow-y-auto rounded-lg shadow-md p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-center mb-4 text-xl font-bold">
            Edit Passage Detail
          </h1>
        </div>
        {passages && passages.length > 0 ? (
          passages.map((passage, index) => (
            <Accordion
              type="single"
              collapsible
              className="w-full bg-[#F1FFEF] border-2 border-[#188F09] rounded-lg px-4 mt-4"
            >
              <AccordionItem value="item-1" key={passage.id}>
                <AccordionTrigger className="flex gap-3 items-center font-bold relative">
                  <span>Passage {index + 1}:</span> <span>{passage.title}</span>{" "}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="absolute right-10 bg-transparent hover:bg-black/10 rounded-full p-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <HiOutlineDotsVertical className="size-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 flex items-center justify-center flex-col gap-5">
                      <Button
                        className="w-28 px-2 py-1 line-clamp-1 bg-transparent rounded-lg text-xs hover:bg-yellow-500 hover:text-white font-semibold border-yellow-500 border-2 text-yellow-500"
                        onClick={(e) => {
                          handleOpenEditPassage(
                            {
                              id: passage.id,
                              title: passage.title,
                              passage: passage.passage,
                            },
                            e
                          );
                        }}
                      >
                        Edit Passage
                      </Button>
                      <Button
                        className="w-28 px-2 py-1 line-clamp-1 bg-transparent rounded-lg text-xs hover:bg-red-500 hover:text-white font-semibold border-red-500 border-2 text-red-500"
                        onClick={(e) => {
                          handleOpenDiaDeletePassage(passage.id, e);
                        }}
                      >
                        Delete Passage
                      </Button>
                    </PopoverContent>
                  </Popover>
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
                    passage.types.map((type) => (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full bg-[#F1FFEF] border-2 border-[#164C7E] rounded-lg px-4 mt-4"
                      >
                        <AccordionItem value="item-1" key={type.id}>
                          <AccordionTrigger className="flex gap-3 items-center font-bold">
                            <span>Type:</span>{" "}
                            <span>
                              {questionTypeDisplayNames[type.type] || type.type}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex justify-end">
                              <Button
                                className="border-2 flex gap-3 border-[#188F09] font-bold bg-white text-[#188F09] hover:text-white hover:bg-[#188F09]"
                                onClick={() =>
                                  handleOpenCreateQuestion(type.id, type.type)
                                }
                              >
                                Create New Question
                              </Button>
                            </div>
                            {type.questions && type.questions.length > 0 ? (
                              type.questions.map((question, index) => (
                                <div className="w-full flex gap-4 font-bold text-black items-center bg-yellow-200 border-2 border-[#188F09] rounded-lg p-3 mt-4">
                                  <span>Question {index + 1}:</span>{" "}
                                  <span>{question.question}</span>
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
                      There are currently no Type Question available.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        ) : (
          <div className="text-center text-black">
            There are currently no passages available.
          </div>
        )}
      </div>
    </div>
  );
};

export default EditReadingExam;

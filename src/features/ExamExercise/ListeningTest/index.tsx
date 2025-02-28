import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ListeningFooter from "./components/ListeningFooter";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
interface Question {
  id: number;
  text: string;
  answer: string;
}

const ListeningTest = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "Sometimes, somebody do something", answer: "Capital" },
    {
      id: 2,
      text: "What do Adam Levine's family do while they were camping beside the lake?",
      answer: "light",
    },
    {
      id: 3,
      text: "What do Adam Levine's family do while they were camping beside the lake?",
      answer: "",
    },
    { id: 4, text: "Sometimes, somebody do something", answer: "" },
    {
      id: 5,
      text: "What do Adam Levine's family do while they were camping beside the lake?",
      answer: "",
    },
    {
      id: 6,
      text: "What do Adam Levine's family do while they were camping beside the lake?",
      answer: "",
    },
    {
      id: 7,
      text: "What do Adam Levine's family do while they were camping beside the lake?",
      answer: "",
    },
    {
      id: 8,
      text: "What do Adam Levine's family do while they were camping beside the lake?",
      answer: "",
    },
    { id: 9, text: "Sometimes, somebody do something", answer: "" },
    {
      id: 10,
      text: "What do Adam Levine's family do while they were camping beside the lake?",
      answer: "",
    },
  ]);
  const handleAnswerChange = (id: number, value: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, answer: value } : question
      )
    );
  };
  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //   }
  // }, [id]);
  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      <Header
        timeLeft={3528}
        title="Listening Test"
        isLoading={false}
        id={id}
      />
      <div className="flex-1 my-20 h-full overflow-y-hidden relative">
        <div className="grid grid-cols-1 gap-6 p-6">
          <div className="p-6 overflow-y-auto">
            <div className="mb-6 rounded-lg bg-[#164C7E] p-4 text-white">
              <h3 className="text-lg font-semibold">QUESTION 1 -10</h3>
              <p>Choose ONE WORD ONLY from the passage for each question</p>
            </div>
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={cn(
                    "space-y-2 flex border py-2 px-5 rounded-xl",
                    question.text.length > 200
                      ? "flex-col items-start gap-2"
                      : "gap-5 items-center"
                  )}
                >
                  <p className="text-sm">
                    <span className="font-bold">{question.id}, </span>
                    {question.text}
                  </p>
                  <Input
                    type="text"
                    value={question.answer}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    className="w-[1/3] border-b-4 rounded-xl text-[#164C7E] border-[#164C7E]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ListeningFooter />
    </div>
  );
};

export default ListeningTest;

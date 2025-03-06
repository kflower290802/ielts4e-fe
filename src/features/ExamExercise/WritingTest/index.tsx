import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import WritingTestFooter from "./components/WritingTestFooter";
import Header from "../components/Header";
import { useParams, useSearchParams } from "react-router-dom";
import DialogConfirm from "../ListeningTest/components/DialogConfirm";
import { useWritingExamById } from "./hooks/useWritingExamById";
import { useWritingExamAnswers } from "./hooks/useWritingExamAnswer";

export default function WritingTest() {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: writingAnswers } = useWritingExamAnswers();
  const [openDia, setOpenDia] = useState(false);
  const { data, refetch } = useWritingExamById(id ?? "");
  const [searchParams, setSearchParams] = useSearchParams();
  const taskParam = searchParams.get("task") ?? "1";
  const [currentTask, setCurrentTask] = useState(
    taskParam ? parseInt(taskParam) : 1
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  useEffect(() => {
    if (data?.exam) {
      const initialAnswers: Record<string, string> = {};
      data?.exam.forEach((task) => {
        initialAnswers[task.id] = task.answer || "";
      });

      setAnswers(initialAnswers);
    }
  }, [data]);

  useEffect(() => {
    const sendAnswers = async () => {
      if (Object.keys(answers).length === 0) return;

      const answerArray = Object.entries(answers).map(
        ([questionId, answer]) => ({
          examId: id ?? "",
          examWritingId: questionId,
          answer,
        })
      );

      try {
        await writingAnswers(answerArray);
        console.log("Answers sent successfully");
      } catch (error) {
        console.error("Failed to send answers:", error);
      }
    };

    const interval = setInterval(() => {
      sendAnswers();
    }, 20000); // Gửi mỗi 20 giây

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [answers, id, writingAnswers]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (currentTask) newSearchParams.set("task", currentTask.toString());
    setSearchParams(newSearchParams);
  }, [currentTask, setSearchParams]);

  const [wordCount, setWordCount] = useState<number>(0);
  const task = data?.exam[currentTask - 1];
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    setOpenDia(true);
  }, []);
  const handleInput =
    (taskId: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      setAnswers((prev) => ({
        ...prev,
        [taskId]: e.target.value,
      }));

      setWordCount(text.length);
    };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-green-50">
      <Header timeLeft={3528} title="Writing Test" isLoading={false} id={id} />
      <DialogConfirm
        openDia={openDia}
        setOpenDia={setOpenDia}
        title={"ARE YOU READY TO START THE WRITING TEST?"}
        id={id}
      />
      <div className="flex-1 my-20 h-full w-11/12 overflow-y-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Panel - Task Description */}
          <div className="border flex flex-col justify-between h-[75vh] border-black rounded-lg overflow-auto bg-white p-6 shadow-sm">
            <span>
              <h2 className="text-xl font-bold mb-4">
                WRITING TASK {currentTask}
              </h2>
              <span>{data?.exam[currentTask - 1].content}</span>
            </span>
            <div className="flex justify-center mb-4">
              <img
                src={data?.exam[currentTask - 1].image}
                alt="Diagram showing flood protection methods"
                className="border border-gray-200 rounded w-11/12 h-72 object-contain
                "
              />
            </div>
          </div>

          {/* Right Panel - Text Editor */}
          <div className="border border-black rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col h-full w-full">
              <div className="flex-grow mb-4">
                <Textarea
                  id={task?.id}
                  value={answers[task?.id ?? ""]}
                  onChange={handleInput(task?.id ?? "")}
                  className="w-full h-full p-4 border border-black rounded-lg resize-none"
                  placeholder="Start writing here..."
                />
              </div>
              <div className="text-left">
                <p className="text-gray-700">Words count: {wordCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <WritingTestFooter
          setCurrentTask={setCurrentTask}
          currentTask={currentTask}
          tasks={data?.exam}
          answers={answers}
        />
      </div>
    </div>
  );
}

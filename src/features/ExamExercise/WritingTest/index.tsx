import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import WritingTestFooter from "./components/WritingTestFooter";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

export default function WritingTest() {
  const { id } = useParams<{ id: string }>();
  const [text, setText] = useState<string>(
    "These villages provide a haven for those seeking quietude and a closer connection to nature. Kayaking is yet another perfect lake activity to try. Zach loves to take his kayak out with a couple of fishing poles on the back in hopes of catching a mega bass! Like paddleboarding, you'll find kayaking to be an awesome workout. It's always nice when you can get in a workout and still have fun while doing it."
  );
  const [wordCount, setWordCount] = useState<number>(0);
  const [activeTask, setActiveTask] = useState<number>(1);

  useEffect(() => {
    // Count words by splitting on whitespace and filtering out empty strings
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-green-50">
      <Header
        timeLeft={3528}
        title="Writing Test"
        isLoading={false}
        id={id}
      />
      <div className="flex-1 my-20 h-full overflow-y-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Panel - Task Description */}
          <div className="border border-gray-300 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">
              WRITING TASK {activeTask}
            </h2>
            <p className="mb-4">You should spend 20 minutes for this task.</p>

            <p className="mb-4">
              The diagram below show how houses can be protected in areas which
              are prone to flooding.
            </p>

            <p className="mb-4 font-medium">
              Write a report for a university, lecture describing the
              information shown below
            </p>

            <p className="mb-6">You should write at least 150 words.</p>

            <div className="flex justify-center mb-4">
              <img
                src="/images/writing.png"
                alt="Diagram showing flood protection methods"
                className="border border-gray-200 rounded w-11/12"
              />
            </div>
          </div>

          {/* Right Panel - Text Editor */}
          <div className="border border-gray-300 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col h-full w-full">
              <div className="flex-grow mb-4">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none"
                  placeholder="Start writing here..."
                />
              </div>
              <div className="text-right">
                <p className="text-gray-700">Words count: {wordCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <WritingTestFooter />
      </div>
    </div>
  );
}

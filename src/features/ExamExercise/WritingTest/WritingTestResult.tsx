import { Textarea } from "@/components/ui/textarea";
import WritingTestFooter from "./components/WritingTestFooter";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

export default function WritingTestResult() {
  const { id } = useParams<{ id: string }>();
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
              WRITING TASK 
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
                //   value={text}
                //   onChange={(e) => setText(e.target.value)}
                  className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none"
                  placeholder="Start writing here..."
                />
              </div>
              <div className="text-right">
                <p className="text-gray-700">Words count: 54</p>
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

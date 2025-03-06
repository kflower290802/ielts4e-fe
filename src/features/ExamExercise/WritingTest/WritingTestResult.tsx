import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check } from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { Route } from "@/constant/route";
import { useNavigate } from "react-router-dom";

const WritingTestResult = () => {
  const [wordCount, setWordCount] = useState(184);
  const nav = useNavigate()
  const [paragraphCount, setPararagraphCount] = useState(3);
  const [essayText, setEssayText] = useState(
    `A peaceful village in the mountains often conjures images of serene, picturesque settings where life moves at a slower pace. Such villages are usually nestled amidst lush greenery and flanked by towering peaks. They offer a tranquil escape from the hustle and bustle of city life, with stunning natural surroundings and a relaxed atmosphere. One example is Gimmelwald, Switzerland, a small mountain village known for its tranquility and beautiful alpine scenery.\n\nThese villages provide a haven for those seeking quietude and a closer connection to nature. Kayaking is yet another perfect lake activity to try. Zach loves to take his kayak out with a couple of fishing poles on the back in hopes of catching a mega bass! Like paddleboarding, you'll find kayaking to be an awesome workout. It's always nice when you can get in a workout and still have fun while doing it.\n\nThese villages provide a haven for those seeking quietude and a closer connection to nature. Kayaking is yet another perfect lake activity to try. Zach loves to take his kayak out with a couple of fishing poles on the back in hopes of catching a mega bass! Like paddleboarding, you'll find kayaking to be an awesome workout. It's always nice when you can get in a workout and still have fun while doing it.`
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEssayText(text);

    // Count words
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);

    // Count paragraphs
    const paragraphs = text
      .split("\n\n")
      .filter((para) => para.trim().length > 0);
    setPararagraphCount(paragraphs.length);
  };

  return (
    <div className="flex flex-col gap-5 min-h-screen bg-[#F1FFEF] overflow-y-hidden">
      <div
        className="px-6 flex items-center gap-4 text-lg font-semibold cursor-pointer"
        onClick={() => nav(Route.Exam)}
      >
        <ArrowLeft className="h-8 w-8" /> Back To Exam
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center h-[90vh] w-11/12 justify-center gap-4">
          {/* Left Card - Task Instructions */}
          <div className="w-1/3 border-2 border-black h-full rounded-lg bg-white overflow-y-auto">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">WRITING TASK 1</h1>

              <p className="mb-4">You should spend 20 minutes for this task.</p>

              <p className="mb-4">
                The diagram below show how houses can be protected in areas
                which are prone to flooding.
              </p>

              <p className="mb-4">
                Write a report for a university, lecture describing the
                information shown below
              </p>

              <p className="mb-5">You should write at least 150 words.</p>

              <div className="w-full">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B63OnwZ8V2RztBO0rGP3O7LNmydJx2.png"
                  alt="Diagram showing flood protection methods"
                  className="w-full max-w-md mx-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Middle Card - Essay Text Area */}
          <div className="h-full w-2/3 flex border-2 bg-white border-black rounded-lg">
            <div className="w-1/2 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <span className="font-medium">Words count: </span>
                    <span>{wordCount}</span>
                  </div>
                  <div>
                    <span className="font-medium">Paragraph: </span>
                    <span>{paragraphCount}</span>
                  </div>
                </div>

                {/* Essay Text Area */}
                <div className="flex-grow">
                  <Textarea
                    className="w-full h-[75vh] p-4 border border-gray-300 rounded-md"
                    value={essayText}
                    onChange={handleTextChange}
                  />
                </div>
              </div>
            </div>

            {/* Right Card - Scoring */}
            <div className="w-1/2 h-[93%] rounded-xl overflow-hidden overflow-y-auto">
              <div className="p-6 h-full">
                {/* Score Card */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white border-2 border-gray-200 rounded-lg px-10 py-4 shadow-sm">
                    <div className="text-6xl font-bold text-green-600 text-center">
                      6.0
                    </div>
                    <div className="text-sm font-medium text-center mt-1">
                      OVERALL
                    </div>
                  </div>
                </div>

                {/* Scoring Categories */}
                <div className="space-y-4">
                  <ScoreCategory title="Coherence and Cohesion:" score={7.0} />
                  <ScoreCategory title="Lexical Resource:" score={7.0} />
                  <ScoreCategory title="Lexical Resource:" score={7.0} />
                  <ScoreCategory
                    title="Grammatical Range and Accuracy"
                    score={5.0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ScoreCategoryProps {
  title: string;
  score: number;
}

function ScoreCategory({ title, score }: ScoreCategoryProps) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="font-medium text-lg">{title}</div>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-green-600">
            {score.toFixed(1)}
          </div>
          <Button
            className="border-[#164C7E] border-2 rounded-lg font-bold bg-white hover:bg-[#164C7E] hover:text-white px-6"
            onClick={() => setShowDetail(true)}
          >
            Details
          </Button>
        </div>
      </div>
      {showDetail && (
        <div className="flex flex-col mt-4">
          <div className="flex gap-3 items-center">
            <Check className="text-[#188F09]" />
            <span>Include an introduction and conclusion</span>
          </div>
          <div className="flex gap-3 items-center">
            <Check className="text-[#188F09]" />
            <span>Include an introduction and conclusion</span>
          </div>
          <div className="flex gap-3 items-center">
            <GoDotFill className="text-red-500" />
            <span>Include an introduction and conclusion</span>
          </div>
          <div className="flex gap-3 items-center">
            <Check className="text-[#188F09]" />
            <span>Include an introduction and conclusion</span>
          </div>
          <Button
            className="border-[#164C7E] mt-5 w-32 mx-auto border-2 rounded-lg font-bold bg-white hover:bg-[#164C7E] hover:text-white px-6"
            onClick={() => setShowDetail(false)}
          >
            Hide
          </Button>
        </div>
      )}
    </div>
  );
}
export default WritingTestResult;

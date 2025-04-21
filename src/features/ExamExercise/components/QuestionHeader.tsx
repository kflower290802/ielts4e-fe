import { cn } from "@/lib/utils";
import React from "react";

interface QuestionHeaderProps {
  start: number;
  end: number;
  instruction: string;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  start,
  end,
  instruction,
}) => {
  return (
    <div
      className={cn(
        start === 1 ? "" : "my-6",
        "rounded-lg bg-blue-900 p-4 flex gap-3 items-center text-white"
      )}
    >
      <h3 className="text-lg font-semibold">
        QUESTION {start} - {end}
      </h3>
      <p>{instruction}</p>
    </div>
  );
};

export default QuestionHeader;

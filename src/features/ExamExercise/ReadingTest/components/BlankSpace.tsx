import React from "react";
import { useDrop } from "react-dnd";

interface Props {
  index: number;
  onDrop: (index: number, word: string) => void;
  word: string;
}

const BlankSpace: React.FC<Props> = ({ index, onDrop, word }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "WORD",
    drop: (item) => onDrop(index, item.word),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <span
      ref={drop}
      className={`p-2 m-2 border-2 border-dashed w-24 min-w-fit h-10 flex items-center justify-center ${
        isOver ? "bg-gray-300" : "bg-white"
      }`}
    >
      {word || ""}
    </span>
  );
};

export default BlankSpace;

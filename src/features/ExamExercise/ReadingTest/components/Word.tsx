import React from "react";
import { useDrag } from "react-dnd";

interface Props {
  answer: { id: string; answer: string; question: { id: string } };
}

const Word: React.FC<Props> = ({ answer }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "WORD",
    item: { word: answer.answer },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 m-2 border rounded cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {answer.answer}
    </div>
  );
};
export default Word;

import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ExerciseLayout() {
  const [timeLeft, setTimeLeft] = useState(3528);
  const [currentPassage, setCurrentPassage] = useState(1);
  const [scores, setScores] = useState({
    passage1: "2/13",
    passage2: "0/13",
    passage3: "0/14",
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      <Header timeLeft={timeLeft} />
      {/* Main Content */}
      <div className="flex-1 my-24 overflow-y-hidden">
        <Outlet />
      </div>
      <Footer
        currentPassage={currentPassage}
        setCurrentPassage={setCurrentPassage}
        scores={scores}
      />
    </div>
  );
}

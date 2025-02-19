import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useStartExam } from "@/features/Exercise/hooks/useStartExam";

export default function ExerciseLayout() {
  const { id } = useParams<{ id: string }>();
  const { data,refetch } = useStartExam(id ?? "");
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const [timeLeft, setTimeLeft] = useState(3528);
  const [currentPassage, setCurrentPassage] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden bg-white">
      <Header timeLeft={timeLeft} title={data?.exam.name ?? ''}/>
      {/* Main Content */}
      <div className="flex-1 my-24 overflow-y-hidden">
        <Outlet/>
      </div>
      <Footer
        currentPassage={currentPassage}
        setCurrentPassage={setCurrentPassage}
        passages={data?.exam.examPassage!}
      />
    </div>
  );
}

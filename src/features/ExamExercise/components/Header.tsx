import { exitExam } from "@/api/exam";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Route } from "@/constant/route";
import { setStorage } from "@/utils/storage";
import { formatMillisecondsToMMSS } from "@/utils/time";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface IProps {
  timeLeft: number;
  title: string;
  isLoading: boolean;
  id: string | undefined;
}
const Header = ({ timeLeft, title, isLoading, id }: IProps) => {
  const [remainingTime, setRemainingTime] = useState(timeLeft);
  useEffect(() => {
    if (isLoading) return;
    if (remainingTime <= 0) {
      handleExit(id ?? "");
      return;
    }
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, id, isLoading]);
  const nav = useNavigate();
  const handleExit = async (id: string) => {
    await exitExam(id);
    nav(Route.Exam);
    setStorage("isTesting", false);
  };
  return (
    <div className="bg-white flex items-center justify-between shadow border-b h-20 px-6 fixed top-0 z-50 w-full">
      {isLoading ? (
        <Skeleton className="h-4 w-[250px]" />
      ) : (
        <h1 className="text-xl font-bold text-[#164C7E]">
          {title.toUpperCase()}
        </h1>
      )}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border-2 px-4 py-2">
          <Clock className="h-5 w-5" />
          <span className="text-lg font-semibold text-[#9A2E2E]">
            {formatMillisecondsToMMSS(remainingTime)}
          </span>
        </div>
        <Button
          className="bg-white border-2 border-[#164C7E] text-[#164C7E] font-bold px-8 py-5 hover:bg-[#164C7E] hover:text-white"
          onClick={() => handleExit(id ?? "")}
        >
          EXIT
        </Button>
      </div>
    </div>
  );
};

export default Header;

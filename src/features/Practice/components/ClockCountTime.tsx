import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const ClockCountTime = () => {
  const [time, setTime] = useState(0); // Lưu số giây đã trôi qua

  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(timer);
  }, []);

  // Chuyển đổi giây thành định dạng hh:mm:ss
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <div className="h-fit w-28 flex items-center justify-center rounded-lg border-2 p-2">
      <div className="flex gap-2 items-center">
        <Clock className="h-5 w-5" />
        <span className="font-semibold text-[#9A2E2E]">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default ClockCountTime;

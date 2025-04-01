import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight, Pause, Play } from "lucide-react";
interface IProps {
  src: string;
  disabled?: boolean;
  questionId: string
  onComplete?: () => void;
  setActice: React.Dispatch<React.SetStateAction<string | null>>
}
const AudioPlayer = ({ src, disabled = false, onComplete, setActice, questionId }: IProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [remainingTime, setRemainingTime] = useState("0:00");
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  }, [src]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
      setRemainingTime(
        formatTime(audioRef.current.duration - audioRef.current.currentTime)
      );
    }
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setRemainingTime(formatTime(audioRef.current.duration));
    }
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && !isPlaying) {
      const seekTime =
        (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setActice(questionId)
    }
  };

  const seekForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const seekBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };
  const handleEnded = () => {
    setIsPlaying(false);
    onComplete?.();
  };

  return (
    <div className="w-full rounded-xl border px-3 py-1 flex items-center gap-2">
      <Button
        onClick={seekBackward}
        className="relative rounded-full size-10 p-5 hover:bg-gray-400 bg-[#D9D9D9]"
        disabled={disabled}
      >
        <ChevronsLeft size={20} className="absolute text-black" />
      </Button>
      <Button
        onClick={togglePlayPause}
        className="relative rounded-full size-10 p-5 hover:bg-gray-400 bg-[#D9D9D9]"
        disabled={disabled}
      >
        {isPlaying ? (
          <Pause size={20} className="absolute text-black" />
        ) : (
          <Play size={20} className="absolute text-black" />
        )}
      </Button>
      <Button
        onClick={seekForward}
        className="relative rounded-full size-10 p-5 hover:bg-gray-400 bg-[#D9D9D9]"
        disabled={disabled}
      >
        <ChevronsRight size={20} className="absolute text-black" />
      </Button>
      <Input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full h-1 bg-gray-500 rounded-lg cursor-pointer"
        disabled={disabled}
      />
      <span className="text-black text-sm w-10">{remainingTime}</span>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default AudioPlayer;

import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
interface IProps {
  src: string;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  section?: number;
}
const AudioPlayer = ({
  src,
  setIsPlaying,
  isPlaying,
  progress,
  setProgress,
}: IProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [remainingTime, setRemainingTime] = useState("0:00");
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.currentTime = 0;
      setProgress(0);
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Autoplay prevented: User interaction required", error);
        }
      };

      playAudio();
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

  return (
    <div className="w-full rounded-xl flex items-center gap-4">
      <Input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full h-1 bg-gray-500 rounded-lg cursor-pointer"
      />
      <span className="text-black text-sm w-10">{remainingTime}</span>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;

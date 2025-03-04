import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import DialogConfirm from "./DialogConfirm";
interface IProps {
  title: string;
  src: string;
  idResult: string;
}
const AudioPlayer = ({ src, title, idResult }: IProps) => {
  const [openDia, setOpenDia] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState("0:00");

  useEffect(() => {
    setOpenDia(true);
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

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
      {idResult === "" && (
        <DialogConfirm
          openDia={openDia}
          setOpenDia={setOpenDia}
          setIsPlaying={setIsPlaying}
          title={title}
        />
      )}
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

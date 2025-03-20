import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
interface IProps {
  src: string;
}
const AudioPlayer = ({
  src
}: IProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [remainingTime, setRemainingTime] = useState("0:00");
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false)
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

  return (
    <div className="w-full rounded-xl border px-3 py-1 flex items-center gap-2">
      <Button onClick={seekBackward} variant="outline" className="relative rounded-full size-10 p-5 bg-white border">
        <RotateCcw size={15} className="absolute text-black"/>
      </Button>
      <Button onClick={togglePlayPause} variant="outline" className="relative rounded-full size-10 p-5 bg-white border">
        {isPlaying ? <Pause size={20} className="absolute text-black"/> : <Play size={20} className="absolute text-black"/>}
      </Button>
      <Button onClick={seekForward} variant="outline" className="relative rounded-full size-10 p-5 bg-white border">
        <RotateCw size={20} className="absolute text-black"/>
      </Button>
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

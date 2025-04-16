// Recording.tsx
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import useCloudinaryUpload from "@/features/hooks/useImageUpload";

interface RecordingProps {
  answers: Record<string, string>;
  questionId: string;
  canRecord: boolean;
  handleAudioUploaded: (questionId: string, url: string) => void;
}

const Recording = ({
  questionId,
  canRecord,
  handleAudioUploaded,
  answers,
}: RecordingProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState("2:00");
  const {
    uploadFile,
    uploadedFileUrl,
    isUploading,
    setUploadedFileUrl,
    error,
  } = useCloudinaryUpload();

  const MAX_TIME = 120; // 2 phút = 120 giây

  // Format thời gian
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Bắt đầu thu âm
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const file = new File([audioBlob], `recording_${questionId}.wav`, {
          type: "audio/wav",
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const fileList = dataTransfer.files;

        // Upload lên Cloudinary ngay khi dừng
        const uploadedUrl = await uploadFile(fileList);
        if (uploadedUrl) {
          setUploadedFileUrl(uploadedUrl);
          handleAudioUploaded(questionId, uploadedUrl);
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setProgress(0);
      setRemainingTime(formatTime(MAX_TIME));

      // Cập nhật tiến trình
      let timeElapsed = 0;
      timerRef.current = setInterval(() => {
        timeElapsed += 1;
        const currentProgress = (timeElapsed / MAX_TIME) * 100;
        setProgress(currentProgress);
        setRemainingTime(formatTime(MAX_TIME - timeElapsed));

        if (timeElapsed >= MAX_TIME) {
          stopRecording();
        }
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Dừng thu âm
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setProgress(100);
      setRemainingTime("0:00");
    }
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Hàm tải file audio
  // const downloadAudio = () => {
  //   if (audioUrl) {
  //     const link = document.createElement("a");
  //     link.href = audioUrl;
  //     link.download = `recording_question_${index + 1}.wav`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  return (
    <div className="flex items-center gap-4 justify-center">
      {!isRecording && !answers[questionId] && (
        <div className="w-1/2 rounded-xl border px-3 py-1 flex items-center gap-2">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant="outline"
            className={cn(
              "relative rounded-full size-10 p-5",
              isRecording
                ? "bg-red-100 hover:bg-red-200"
                : "bg-green-100 hover:bg-green-200"
            )}
            disabled={!canRecord}
          >
            <Mic size={20} className="absolute text-black" />
          </Button>

          <Input
            type="range"
            min="0"
            max="100"
            value={progress}
            className={cn(
              "w-full h-1 rounded-lg cursor-default",
              isRecording ? "bg-red-500" : "bg-gray-500"
            )}
          />
        </div>
      )}
      {isRecording && (
        <div className="w-1/2 rounded-xl border px-3 py-1 flex items-center gap-2">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant="outline"
            className={cn(
              "relative rounded-full size-10 p-5",
              isRecording
                ? "bg-red-100 hover:bg-red-200"
                : "bg-green-100 hover:bg-green-200"
            )}
            disabled={!canRecord}
          >
            <Square size={20} className="absolute text-black" />
          </Button>

          <Input
            type="range"
            min="0"
            max="100"
            value={progress}
            className={cn(
              "w-full h-1 rounded-lg cursor-default",
              isRecording ? "bg-red-500" : "bg-gray-500"
            )}
          />
          <span className="text-black text-sm w-10">{remainingTime}</span>
        </div>
      )}
      {!isRecording && answers[questionId] && (
        <div className="flex items-center gap-4">
          <audio controls src={answers[questionId]} className="w-96" />
          {isUploading && <p>Đang tải lên...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {uploadedFileUrl && (
            <p className="text-green-500">Tải lên thành công!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Recording;

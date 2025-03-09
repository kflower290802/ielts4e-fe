import { useSpeakingExamAnswers } from "@/features/ExamExercise/SpeakingTest/hooks/useSpeakingExamAnswer";
import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

interface AudioRecorderContextType {
  isRecording: boolean;
  setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>;
  audioUrl: string | null;
  startRecording: (examSpeakId: string, examId: string) => Promise<void>;
  stopRecording: (examSpeakId: string, examId: string) => void;
  timeLeft: number;
  // handleSaveAnswer: (examSpeakId: string, examId: string) => void;
  // setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const AudioRecorderContext = createContext<
  AudioRecorderContextType | undefined
>(undefined);

export const AudioRecorderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { mutateAsync: speakAnswer } = useSpeakingExamAnswers();
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const startRecording = async (examSpeakId: string, examId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        stopRecording(examSpeakId, examId, audioBlob );
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
      setIsRecording(true);

      // Start the countdown
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            stopRecording();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = useCallback(
    (examSpeakId?: string, examId?: string, audioBlob?: Blob) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
      setTimeLeft(120);

      if (audioBlob && examSpeakId && examId) {
        handleSaveAnswer(examSpeakId, examId, audioBlob);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);
  const handleSaveAnswer = async (examSpeakId: string, examId: string, audioBlob: Blob) => {
    if (!audioBlob) {
      console.log("No audio files were found.");
      return;
    }
    const audioFile = new File([audioBlob], "recording.wav", {
      type: "audio/wav",
    });
    const formData = new FormData();
    formData.append("examSpeakId", examSpeakId);
    formData.append("examId", examId);
    formData.append("answer", audioFile);
    await speakAnswer(formData);
    setAudioUrl(null);
  };
  return (
    <AudioRecorderContext.Provider
      value={{
        isRecording,
        setAudioUrl,
        audioUrl,
        startRecording,
        stopRecording,
        timeLeft,
        // handleSaveAnswer,
      }}
    >
      {children}
    </AudioRecorderContext.Provider>
  );
};

export const useAudioRecorder = () => {
  const context = useContext(AudioRecorderContext);
  if (!context) {
    throw new Error(
      "useAudioRecorder must be used within an AudioRecorderProvider"
    );
  }
  return context;
};

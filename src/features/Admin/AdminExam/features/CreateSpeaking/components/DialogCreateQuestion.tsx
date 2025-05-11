import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateSpeakingQuestion } from "../hooks/useCreateSpeakingQuestion";
import { Input } from "@/components/ui/input";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  id: string | undefined;
  refetch: () => void;
}
const DialogCreateQuestion = ({ openDia, setOpenDia, id, refetch }: IProps) => {
  const { mutateAsync: createQuestion, isPending } =
    useCreateSpeakingQuestion();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [partId, setPartId] = useState<string>(id || "");
  useEffect(() => {
    setPartId(id || "");
  }, [id]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleSubmit = async () => {
    if (!selectedFile || !partId) {
      console.error("Missing file or partId");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("question", selectedFile);
      formData.append("partId", partId);

      await createQuestion(formData);
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to create question:", error);
    } finally {
      refetch();
      setOpenDia(false);
    }
  };
  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="p-6 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E]">
        <h2 className="text-lg font-semibold mb-4">Create New Question</h2>
        <div className="space-y-4">
          <Label htmlFor="questionFile">Question</Label>
          <Input
            type="file"
            id="questionFile"
            onChange={handleFileChange}
            className="border-[#164C7E] w-full p-2 border rounded"
          />
        </div>

        <Button
          isLoading={isPending}
          onClick={handleSubmit}
          className="w-full rounded-full bg-[#164C7E] text-white hover:bg-[#123d66] mt-4"
        >
          Create Question
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateQuestion;

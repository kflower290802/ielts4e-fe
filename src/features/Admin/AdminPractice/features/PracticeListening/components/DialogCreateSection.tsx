import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCreatePracticeListening } from "../hooks/useCreatePracticeListening";
import { Input } from "@/components/ui/input";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  id: string | undefined;
  refetch: () => void;
}
const DialogCreateListening = ({
  openDia,
  setOpenDia,
  id,
  refetch,
}: IProps) => {
  const { mutateAsync: createListening, isPending } =
    useCreatePracticeListening();
  const [formData, setFormData] = useState({
    practiceId: id || "",
    audio: null as File | null,
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      practiceId: id || "",
    }));
  }, [id]);

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      audio: file,
    }));
  };
  const handleSubmit = async () => {
    if (!formData.practiceId || !formData.audio) {
      toast.error("Please fill in all required fields");
      return;
    }
    const data = new FormData();
    data.append("practiceId", formData.practiceId);
    if (formData.audio) data.append("audio", formData.audio);

    try {
      await createListening(data);
      setFormData({
        practiceId: id || "",
        audio: null,
      });
    } catch (error) {
      console.error(error);
    } finally {
      refetch();
      setOpenDia(false);
    }
  };
  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="p-6 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E]">
        <h2 className="text-lg font-semibold mb-4">Add New Audio</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Audio</label>
          <Input
            type="file"
            onChange={handleAudioChange}
            className="border-[#164C7E] text-[#164C7E]"
          />
        </div>
        <Button
          isLoading={isPending}
          onClick={handleSubmit}
          className="w-full rounded-full bg-[#164C7E] text-white hover:bg-[#123d66]"
        >
          Add New Audio
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateListening;

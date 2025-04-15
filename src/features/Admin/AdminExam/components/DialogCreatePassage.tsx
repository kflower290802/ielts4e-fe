import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCreatePassage } from "../hooks/useCreatePassage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  id: string | undefined;
  refetch: () => void;
}
const DialogCreatePassage = ({ openDia, setOpenDia, id, refetch }: IProps) => {
  const { mutateAsync: createPassage, isPending } = useCreatePassage();
  const [formData, setFormData] = useState({
    examId: id || "",
    title: "",
    passage: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      await createPassage(formData);
      setOpenDia(false);
      setFormData({ examId: id || "", title: "", passage: "" });
    } catch (error) {
      console.error("Error creating passage:", error);
    } finally {
      refetch();
      setOpenDia(false);
    }
  };
  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="px-6 py-2 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E]">
        <h2 className="text-lg font-semibold mb-4">Create New Passage</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="w-full border-[#164C7E] text-[#164C7E]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passage" className="block text-sm font-medium mb-1">
            Passage
          </label>
          <Textarea
            id="passage"
            name="passage"
            value={formData.passage}
            onChange={handleChange}
            placeholder="Enter Passage"
            className="w-full border-[#164C7E] text-[#164C7E] h-32"
          />
        </div>
        <Button
          isLoading={isPending}
          onClick={handleSubmit}
          className="w-full rounded-full bg-[#164C7E] text-white hover:bg-[#123d66]"
        >
          Create Passage
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreatePassage;

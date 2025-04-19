import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreatePracticePassage } from "../hooks/useCreatePassage";
import toast from "react-hot-toast";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  id: string | undefined;
  refetch: () => void;
}
const DialogPracticeCreatePassage = ({
  openDia,
  setOpenDia,
  id,
  refetch,
}: IProps) => {
  const { mutateAsync: createPassage, isPending } = useCreatePracticePassage();
  const [formData, setFormData] = useState({
    practiceId: id || "",
    title: "",
    content: "",
    image: null as File | null,
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      practiceId: id || "",
    }));
  }, [id]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };
  const handleSubmit = async () => {
    if (
      !formData.practiceId ||
      !formData.content ||
      !formData.image ||
      !formData.title
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const data = new FormData();
    data.append("practiceId", formData.practiceId);
    data.append("content", formData.content);
    data.append("image", formData.image);
    data.append("title", formData.title);

    try {
      await createPassage(data);
      setOpenDia(false);
      setFormData({
        practiceId: id || "",
        title: "",
        content: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating passage:", error);
    } finally {
      refetch();
      setOpenDia(false);
    }
  };
  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="p-6 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E]">
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
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter content"
            className="w-full border-[#164C7E] text-[#164C7E] h-32"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border-[#164C7E] text-[#164C7E]"
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

export default DialogPracticeCreatePassage;

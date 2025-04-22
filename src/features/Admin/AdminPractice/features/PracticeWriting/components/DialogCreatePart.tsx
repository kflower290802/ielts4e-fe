import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatePracticeWriting } from "../hooks/useCreatePracticeWriting";
import TextEditorImage from "@/components/TextEditor/TextEditor";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  id: string | undefined;
  refetch: () => void;
}
const DialogCreatePracticePart = ({
  openDia,
  setOpenDia,
  id,
  refetch,
}: IProps) => {
  const { mutateAsync: createPart, isPending } = useCreatePracticeWriting();
  const [formData, setFormData] = useState({
    practiceId: id || "",
    content: "",
    image: null as File | null,
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      practiceId: id || "",
    }));
  }, [id]);
  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("practiceId", formData.practiceId);
    if (formData.content) data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);
    try {
      await createPart(data);
      setOpenDia(false);
    } catch (error) {
      console.error("Error creating section:", error);
    } finally {
      refetch();
      setOpenDia(false);
    }
  };
  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="p-6 w-fit max-w-full bg-white border-2 font-medium border-[#164C7E]">
        <h2 className="text-lg font-semibold mb-4">Create New Part</h2>
        <h1 className="font-semibold mb-4">
          Are you sure you want to create another section?
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <TextEditorImage
            content={formData.content}
            onChange={handleContentChange}
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
          Create Section
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreatePracticePart;

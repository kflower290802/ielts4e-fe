import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateSection } from "../hooks/useCreateSection";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  id: string | undefined;
  refetch: () => void;
}
const DialogCreateSection = ({ openDia, setOpenDia, id, refetch }: IProps) => {
  const { mutateAsync: createSection, isPending } = useCreateSection();
  const handleSubmit = async () => {
    try {
      if (id) {
        await createSection({ examId: id });
      }
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
      <DialogContent className="p-6 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E]">
        <h2 className="text-lg font-semibold mb-4">Create New Section</h2>
        <h1 className="font-semibold mb-4">
          Are you sure you want to create another section?
        </h1>
        <div className="flex justify-between gap-10 items-center">
          <Button
            onClick={() => setOpenDia(false)}
            className="w-full rounded-full bg-[#164C7E] text-white hover:bg-[#123d66]"
          >
            Cancel
          </Button>
          <Button
            isLoading={isPending}
            onClick={handleSubmit}
            className="w-full rounded-full bg-[#164C7E] text-white hover:bg-[#123d66]"
          >
            Create Section
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateSection;

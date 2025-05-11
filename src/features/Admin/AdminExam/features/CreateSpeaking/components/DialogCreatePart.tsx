import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateSpeakingPart } from "../hooks/useCreateSpeakingPart";
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>;
  openDia: boolean;
  id: string | undefined;
  refetch: () => void;
}
const DialogCreatePart = ({ openDia, setOpenDia, id, refetch }: IProps) => {
  const { mutateAsync: createPart, isPending } = useCreateSpeakingPart();
  const handleSubmit = async () => {
    try {
      await createPart({ examId: id ?? "" });
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
      <DialogContent className="p-6 w-fit max-w-full bg-white border-2 font-medium border-[#164C7E] text-[#164C7E]">
        <h2 className="text-lg font-semibold mb-4">Create New Part</h2>
        <h1 className="font-semibold mb-4">
          Are you sure you want to create another section?
        </h1>
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

export default DialogCreatePart;

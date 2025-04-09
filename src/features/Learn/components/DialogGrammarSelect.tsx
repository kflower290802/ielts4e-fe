import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetGrammar } from "../hooks/useGetGrammar";
interface GrammarTenseSelectorProps {
  onTenseSelect: (tense: string) => void;
  selectedTense: string | undefined;
}

export function DialogGrammarSelect({
  onTenseSelect,
  selectedTense,
}: GrammarTenseSelectorProps) {
  const {data: grammars} = useGetGrammar();
  const [open, setOpen] = useState(false);
  const grammarName = () => {
    if (!selectedTense) return "Select Grammar Tense";
    const grammar = grammars?.find((card) => card.id === selectedTense);
    return grammar ? grammar.name : "Unknown Grammar";
  };
  const handleTenseSelect = (tense: string) => {
    onTenseSelect(tense);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-2 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
          {grammarName()}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
          Choose a grammatical tense
          </DialogTitle>
          <DialogDescription className="text-center">
          Choose a grammatical tense to view related lessons.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {grammars?.map((tense) => (
            <div
              key={tense.id}
              onClick={() => handleTenseSelect(tense.id)}
              className={cn(
                "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all",
                selectedTense === tense.id
                  ? "border-[#164C7E] bg-[#164C7E]/10"
                  : "border-gray-200 hover:border-[#164C7E]/50 hover:bg-[#164C7E]/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-lg">{tense.name}</span>
                {selectedTense === tense.id && (
                  <Check className="w-5 h-5 text-[#164C7E]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

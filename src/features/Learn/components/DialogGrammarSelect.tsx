"use client";

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

interface GrammarTense {
  id: string;
  name: string;
  description: string;
}

interface GrammarTenseSelectorProps {
  onTenseSelect: (tense: GrammarTense) => void;
  selectedTense: GrammarTense | null;
  buttonLabel?: string;
}

// Danh sách các thì cơ bản trong tiếng Anh
const grammarTenses: GrammarTense[] = [
  {
    id: "1",
    name: "Present Simple",
    description: "Describes habits, general truths, or repeated actions.",
  },
  {
    id: "2",
    name: "Present Continuous",
    description:
      "Describes actions happening at the moment of speaking or around the present time.",
  },
  {
    id: "3",
    name: "Past Simple",
    description: "Describes actions that happened and finished in the past.",
  },
  {
    id: "4",
    name: "Past Continuous",
    description:
      "Describes actions that were happening at a specific time in the past.",
  },
  {
    id: "5",
    name: "Future Simple",
    description: "Describes actions that will happen in the future.",
  },
  {
    id: "6",
    name: "Present Perfect",
    description:
      "Describes actions that happened in the past but have relevance to the present.",
  },
  {
    id: "7",
    name: "Past Perfect",
    description:
      "Describes actions that happened and finished before another action in the past.",
  },
  {
    id: "8",
    name: "Future Perfect",
    description:
      "Describes actions that will be completed before a certain point in the future.",
  },
  {
    id: "9",
    name: "Conditional Tenses",
    description: "Describes conditions and possible outcomes.",
  },
];

export function DialogGrammarSelect({
  onTenseSelect,
  selectedTense,
  buttonLabel = "Select Tense",
}: GrammarTenseSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleTenseSelect = (tense: GrammarTense) => {
    onTenseSelect(tense);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-2 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
          {selectedTense?.name || buttonLabel}
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
          {grammarTenses.map((tense) => (
            <div
              key={tense.id}
              onClick={() => handleTenseSelect(tense)}
              className={cn(
                "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all",
                selectedTense?.id === tense.id
                  ? "border-[#164C7E] bg-[#164C7E]/10"
                  : "border-gray-200 hover:border-[#164C7E]/50 hover:bg-[#164C7E]/5"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-lg">{tense.name}</span>
                {selectedTense?.id === tense.id && (
                  <Check className="w-5 h-5 text-[#164C7E]" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {tense.description}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

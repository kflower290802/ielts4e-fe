"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopicVocab {
  id: string
  vocabName: string
}

interface TopicSelectorDialogProps {
  onTopicSelect: (topic: TopicVocab) => void
  selectedTopic: TopicVocab | null
  buttonLabel?: string
}

const vocabTopics: TopicVocab[] = [
  { id: "1", vocabName: "Education" },
  { id: "2", vocabName: "Technology" },
  { id: "3", vocabName: "Environment" },
  { id: "4", vocabName: "Health & Fitness" },
  { id: "5", vocabName: "Business & Economy" },
  { id: "6", vocabName: "Travel & Tourism" },
  { id: "7", vocabName: "Science & Research" },
  { id: "8", vocabName: "Geography" },
]

export function DialogVocabTopic({
  onTopicSelect,
  selectedTopic,
  buttonLabel = "Select Topic",
}: TopicSelectorDialogProps) {
  const [open, setOpen] = useState(false)

  const handleTopicSelect = (topic: TopicVocab) => {
    onTopicSelect(topic)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-2 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
          {selectedTopic?.vocabName || buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Select a Topic</DialogTitle>
          <DialogDescription className="text-center">
            Choose a topic to view related vocabulary lessons
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {vocabTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicSelect(topic)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                selectedTopic?.id === topic.id
                  ? "border-[#164C7E] bg-[#164C7E]/10"
                  : "border-gray-200 hover:border-[#164C7E]/50 hover:bg-[#164C7E]/5",
              )}
            >
              {selectedTopic?.id === topic.id && <Check className="w-5 h-5 text-[#164C7E] absolute top-2 right-2" />}
              <span className="font-medium text-center">{topic.vocabName}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}


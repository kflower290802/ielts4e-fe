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
import { useGetTopics } from "../hooks/useGetTopics"

interface TopicSelectorDialogProps {
  onTopicSelect: (topic: string) => void
  selectedTopic: string | undefined
  buttonLabel?: string
}


export function DialogVocabTopic({
  onTopicSelect,
  selectedTopic,
}: TopicSelectorDialogProps) {
  const { data: topics } = useGetTopics()
  const topicName = () => {
    if (!selectedTopic) return "Select Topic";
    const topic = topics?.find((card) => card.id === selectedTopic);
    return topic ? topic.name : "Unknown Topic";
  };
  const [open, setOpen] = useState(false)

  const handleTopicSelect = (topic: string) => {
    onTopicSelect(topic)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-2 bg-white border-2 font-medium border-[#164C7E] text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
          {topicName()}
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
          {topics?.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicSelect(topic.id)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                selectedTopic === topic.id
                  ? "border-[#164C7E] bg-[#164C7E]/10"
                  : "border-gray-200 hover:border-[#164C7E]/50 hover:bg-[#164C7E]/5",
              )}
            >
              {selectedTopic === topic.id && <Check className="w-5 h-5 text-[#164C7E] absolute top-2 right-2" />}
              <span className="font-medium text-center">{topic.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}


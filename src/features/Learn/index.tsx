"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { DialogVocabTopic } from "./components/DialogVocabTopic"
import { DialogGrammarSelect } from "./components/DialogGrammarSelect"

interface TopicVocab {
  id: string
  vocabName: string
}

interface GrammarTense {
  id: string
  name: string
  description: string
}

interface LearningCard {
  id: string
  image: string
  questionCount: number
  description: string
  vocabTopic: TopicVocab
  status?: "new" | "continue" | "retry"
}

interface GrammarCard {
  id: string
  image: string
  questionCount: number
  description: string
  tense: GrammarTense
  status?: "new" | "continue" | "retry"
}

const learningCards: LearningCard[] = [
  {
    id: "1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUVRGUBk5Hz-O_cXDOkH5TDwRdPqQ7sTetA&s",
    questionCount: 15,
    description: "Education",
    status: "new",
    vocabTopic: { id: "1", vocabName: "Education" },
  },
  {
    id: "2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQybU2QmNu9mo8nVzxS3KKJ4-9S6H4bPg6zCw&s",
    questionCount: 15,
    description: "Technology",
    status: "new",
    vocabTopic: { id: "2", vocabName: "Technology" },
  },
  {
    id: "3",
    image: "https://www.voicesofyouth.org/sites/voy/files/images/2019-11/istockphoto-519616538-612x612_0.jpg",
    questionCount: 15,
    description: "Environment",
    status: "new",
    vocabTopic: { id: "3", vocabName: "Environment" },
  },
  {
    id: "4",
    image: "https://hips.hearstapps.com/hmg-prod/images/701/articles/2017/01/how-much-joining-gym-helps-health-2-jpg-1488906648.jpeg",
    questionCount: 15,
    description: "Health & Fitness",
    status: "new",
    vocabTopic: { id: "4", vocabName: "Health & Fitness" },
  },
  {
    id: "5",
    image: "https://virtuzone.com/wp-content/uploads/2024/02/business-economics.jpg",
    questionCount: 15,
    description: "Business & Economy",
    status: "new",
    vocabTopic: { id: "5", vocabName: "Business & Economy" },
  },
  {
    id: "6",
    image: "https://tonyenglish.vn/uploads/news/2017/0921/1505979632_outgoing%20tourism%20mersoft.jpg",
    questionCount: 15,
    description: "Travel & Tourism",
    status: "new",
    vocabTopic: { id: "6", vocabName: "Travel & Tourism" },
  },
]

// Dữ liệu mẫu cho các bài học ngữ pháp theo thì
const grammarCards: GrammarCard[] = [
  {
    id: "g1",
    image: "https://ieltsmastervn.edu.vn/wp-content/uploads/2024/07/present-simple.png",
    questionCount: 15,
    description: "Present Simple",
    status: "new",
    tense: { id: "1", name: "Present Simple", description: "" },
  },
  {
    id: "g2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJHl-ke0a25yW3LrVmRz-zA7AZU37ETKVsWw&s",
    questionCount: 12,
    description: "Present Continuous",
    status: "new",
    tense: { id: "2", name: "Present Continuous", description: "" },
  },
  {
    id: "g3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbGuPs8uZcpcfZgpT4EdH4qM4a7MU-Fvn8g&s",
    questionCount: 18,
    description: "Past Simple",
    status: "new",
    tense: { id: "3", name: "Past Simple", description: "" },
  },
  {
    id: "g4",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFPU8z7mp_CYLkbvHRwxdtqEs80EzBGPbZNQ&s",
    questionCount: 10,
    description: "Past Continuous",
    status: "new",
    tense: { id: "4", name: "Past Continuous", description: "" },
  },
  {
    id: "g5",
    image: "https://envis.edu.vn/wp-content/uploads/thi-tuong-lai-don-the-future-simple-1.png",
    questionCount: 20,
    description: "Future Simple",
    status: "new",
    tense: { id: "5", name: "Future Simple", description: "" },
  },
  {
    id: "g6",
    image: "https://i.ytimg.com/vi/553eeL1Dvho/maxresdefault.jpg",
    questionCount: 15,
    description: "Present Perfect",
    status: "new",
    tense: { id: "6", name: "Present Perfect", description: "" },
  },
]

export default function LearnWithDialog() {
  const [selectedVocabTopic, setSelectedVocabTopic] = useState<TopicVocab | null>(null)
  const [selectedGrammarTense, setSelectedGrammarTense] = useState<GrammarTense | null>(null)

  // Lọc bài học vocabulary dựa trên chủ đề đã chọn
  const filteredVocabCards = selectedVocabTopic
    ? learningCards.filter((card) => card.vocabTopic.id === selectedVocabTopic.id)
    : learningCards

  // Lọc bài học grammar dựa trên thì đã chọn
  const filteredGrammarCards = selectedGrammarTense
    ? grammarCards.filter((card) => card.tense.id === selectedGrammarTense.id)
    : grammarCards

  return (
    <div className="p-6 space-y-8">
      {/* Vocabulary Topics Section */}
      <div className="flex justify-between items-center gap-10">
        <div className="w-full bg-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">VOCABULARY BY TOPIC</h2>
            <DialogVocabTopic
              onTopicSelect={setSelectedVocabTopic}
              selectedTopic={selectedVocabTopic}
              buttonLabel="Select Vocabulary Topic"
            />
          </div>
          {filteredVocabCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {filteredVocabCards.map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <CardContent className="p-0 relative">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.description}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-sm">
                      {card.questionCount} câu
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center gap-2 p-4">
                    <p className="text-sm text-center line-clamp-2">{card.description}</p>
                    <Button
                      className={cn(
                        card.status === "new"
                          ? "border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]"
                          : card.status === "retry"
                            ? "border-2 border-[#188F09] text-[#188F09] hover:bg-[#188F09] hover:text-white bg-white"
                            : "border-2 bg-white border-red-500 text-red-500 hover:text-white hover:bg-red-500",
                      )}
                    >
                      {card.status === "retry" ? "RETRY" : card.status === "continue" ? "CONTINUE" : "START"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No lessons found for this topic.</p>
            </div>
          )}
          {/* <div className="mt-4 flex items-center justify-center gap-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> */}
        </div>
      </div>

      {/* Grammar Tenses Section */}
      <div className="p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">GRAMMAR TENSES</h2>
          <DialogGrammarSelect
            onTenseSelect={setSelectedGrammarTense}
            selectedTense={selectedGrammarTense}
            buttonLabel="Select Grammar Tense"
          />
        </div>
        {filteredGrammarCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredGrammarCards.map((card, index) => (
              <Card key={card.id || index} className="overflow-hidden">
                <CardContent className="p-0 relative">
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.description}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Badge className="absolute text-black top-3 left-3 bg-white/90">{card.questionCount} câu</Badge>
                </CardContent>
                <CardFooter className="flex flex-col justify-between items-center p-3 gap-3">
                  <p className="font-medium text-center flex-1 line-clamp-2">{card.description}</p>
                  <Button className="border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
                    START
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No grammar lessons found for this tense.</p>
          </div>
        )}
        {/* <div className="mt-4 flex items-center justify-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    </div>
  )
}


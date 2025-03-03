import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface LearningCard {
  id: string;
  image: string;
  questionCount: number;
  description: string;
  status?: "new" | "continue" | "retry";
}

const learningCards: LearningCard[] = [
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  {
    id: "1",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KzywVbn51vSQTOKuok5e67zLJOxKcJ.png",
    questionCount: 15,
    description: "Journey to one of the most beautiful lake",
    status: "new",
  },
  // Add more cards here...
];

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  practiceTabs,
  questionTypeFilters,
  statusFilters,
  topicFilters,
} from "@/constant/filter";
import { useNavigate } from "react-router-dom";
import { Route } from "@/constant/route";

export function Practice() {
  const nav = useNavigate()
  return (
    <div className="flex h-full p-8 gap-14">
      <div className="w-64 border bg-white rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Status</h3>
            <div className="space-y-2">
              <RadioGroup>
                {statusFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={filter.id} id={filter.id} />
                    <Label htmlFor={filter.id}>{filter.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Year</h3>
            <div className="space-y-2">
              <RadioGroup>
                {topicFilters.map((topic) => (
                  <div key={topic.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={topic.id} id={topic.id} />
                    <Label htmlFor={topic.id}>{topic.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Exam</h3>
            <div className="space-y-2">
              <RadioGroup>
                {questionTypeFilters.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id}>{type.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-between flex-col items-center">
        <Tabs defaultValue="reading" className="w-full grid-cols-4 gap-6">
          <TabsList className="w-full justify-between">
            {practiceTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="w-full hover:text-[#164C7E]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {practiceTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {learningCards.map((card) => (
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
                      <p className="text-sm text-center">{card.description}</p>
                      <Button
                        className={cn(
                          card.status === "new"
                            ? "border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]"
                            : card.status === "retry"
                            ? "border-2 border-[#188F09] text-[#188F09] hover:bg-[#188F09] hover:text-white bg-white"
                            : "border-2 bg-white border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                        )}
                        onClick={() => nav(Route.PracticeReading)}
                      >
                        {card.status === "retry"
                          ? "RETRY"
                          : card.status === "continue"
                          ? "CONTINUE"
                          : "START"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-4 flex items-center justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
}

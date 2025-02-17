import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
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
  // Add more cards here...
];

export default function Learn() {
  return (
    <div className="p-6 space-y-8">
      {/* Vocabulary Topics Section */}
      <div className="flex justify-between items-center gap-10">
        <div className="w-1/2 bg-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">VOCABULARY BY TOPIC</h2>
            <Badge variant="outline" className="px-6 py-2">
              Geography
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-sm text-center line-clamp-2">
                    {card.description}
                  </p>
                  <Button
                    className={cn(
                      card.status === "new"
                        ? "border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]"
                        : card.status === "retry"
                        ? "border-2 border-[#188F09] text-[#188F09] hover:bg-[#188F09] hover:text-white bg-white"
                        : "border-2 bg-white border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                    )}
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

        {/* Grammar Suggestions Section */}
        <div className="w-1/2 p-6 rounded-lg bg-white">
          <h2 className="text-2xl font-bold mb-4">
            GRAMMAR SUGGESTIONS FOR YOU
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-sm text-center line-clamp-2">
                    {card.description}
                  </p>
                  <Button
                    className={cn(
                      card.status === "new"
                        ? "border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]"
                        : card.status === "retry"
                        ? "border-2 border-[#188F09] text-[#188F09] hover:bg-[#188F09] hover:text-white bg-white"
                        : "border-2 bg-white border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                    )}
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

      {/* All Grammar Points Section */}
      <div className="p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">ALL GRAMMAR TOPICS</h2>
          <Badge variant="outline" className="px-3 py-2">
            Fundamental tenses
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0 relative">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JEvOsTqnxPSB4ZLrGN0cpxnE8Ag0gG.png"
                    alt="Grammar exercise"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90">
                    15 câu
                  </Badge>
                </CardContent>
                <CardFooter className="flex flex-col justify-between items-center p-3 gap-3">
                  <p className="font-medium text-center flex-1 line-clamp-2">
                    Journey to one of the most beautiful lake .
                  </p>
                  <Button className="border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
                    START
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
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

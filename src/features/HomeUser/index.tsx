import { getStorage } from "@/utils/storage";
interface LearningCard {
  image: string;
  date?: string;
  questions?: string;
  title: string;
  buttonText: string;
}
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
export default function Page() {
  const userName = getStorage("userName");
  const recentWork: LearningCard[] = [
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      date: "12/15",
      title: "Journey to one of the most beautiful lake",
      buttonText: "XEM LẠI",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      date: "12/15",
      title: "Journey to one of the most beautiful lake",
      buttonText: "XEM LẠI",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      date: "12/15",
      title: "Journey to one of the most beautiful lake",
      buttonText: "XEM LẠI",
    },
  ];

  const suggestions: LearningCard[] = [
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      questions: "15 câu",
      title: "Journey to one of the most beautiful lake",
      buttonText: "HỌC NGAY",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      questions: "15 câu",
      title: "Journey to one of the most beautiful lake",
      buttonText: "HỌC NGAY",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      questions: "15 câu",
      title: "Journey to one of the most beautiful lake",
      buttonText: "HỌC NGAY",
    },
  ];

  return (
    <div className="p-14">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-xl font-bold">
          WELCOME BACK, <span>{userName?.toUpperCase()}</span>
        </h1>
        <img
          src="/images/hand.svg"
          alt="hand"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </div>

      <main className="flex justify-between items-center gap-10">
        <div className="bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">RECENT WORK</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentWork.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-24 w-full object-cover"
                  />
                  {item.date && (
                    <span className="absolute left-2 top-2 rounded bg-white/80 px-2 py-1 text-sm">
                      {item.date}
                    </span>
                  )}
                </div>
                <div className="p-3 flex flex-col items-center">
                  <h3 className="mb-4 text-sm line-clamp-2">{item.title}</h3>
                  <Button className="border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
                    REVIEW
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
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

        <div className="bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">SUGGESTIONS FOR YOU</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-24 w-full object-cover"
                  />
                  {item.questions && (
                    <span className="absolute left-2 top-2 rounded bg-white/80 px-2 py-1 text-sm">
                      {item.questions}
                    </span>
                  )}
                </div>
                <div className="p-3 flex flex-col items-center">
                  <h3 className="mb-4 text-sm line-clamp-2">{item.title}</h3>
                  <Button className="border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]">
                    START
                  </Button>
                </div>
              </div>
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
      </main>
    </div>
  );
}

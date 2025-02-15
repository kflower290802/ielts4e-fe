import { getStorage } from "@/utils/storage"
import { ChevronRight } from "lucide-react"
interface LearningCard {
  image: string
  date?: string
  questions?: string
  title: string
  buttonText: string
}

export default function Page() {
  const userName = getStorage("userName");
  const recentWork: LearningCard[] = [
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      date: "12/15",
      title: "Journey to one of the most beautiful lake",
      buttonText: "XEM LẠI",
    },
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      date: "12/15",
      title: "Journey to one of the most beautiful lake",
      buttonText: "XEM LẠI",
    },
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      date: "12/15",
      title: "Journey to one of the most beautiful lake",
      buttonText: "XEM LẠI",
    },
  ]

  const suggestions: LearningCard[] = [
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      questions: "15 câu",
      title: "Journey to one of the most beautiful lake",
      buttonText: "HỌC NGAY",
    },
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      questions: "15 câu",
      title: "Journey to one of the most beautiful lake",
      buttonText: "HỌC NGAY",
    },
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqUsGI7gVpwxog8NRcVMC1nAod1qpm.png",
      questions: "15 câu",
      title: "Journey to one of the most beautiful lake",
      buttonText: "HỌC NGAY",
    },
  ]

  return (
    <div className="p-14">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-xl font-bold">WELCOME BACK, <span>{userName}</span></h1>
        <img src="/images/hand.svg" alt="hand" width={32} height={32} className="h-8 w-8" />
      </div>

      <main className="space-y-8">
        <section>
          <h2 className="mb-4 text-lg font-semibold">BÀI LÀM GẦN ĐÂY</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentWork.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover"
                  />
                  {item.date && (
                    <span className="absolute left-2 top-2 rounded bg-white/80 px-2 py-1 text-sm">{item.date}</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-4 line-clamp-2 text-sm">{item.title}</h3>
                  <button className="rounded-full border border-blue-600 px-6 py-1 text-sm text-blue-600 hover:bg-blue-50">
                    {item.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button className="h-8 w-8 rounded-full bg-gray-200">1</button>
            <button className="h-8 w-8 rounded-full bg-green-500 text-white">2</button>
            <button className="h-8 w-8 rounded-full bg-gray-200">3</button>
            <span>...</span>
            <button className="h-8 w-8 rounded-full bg-gray-200">6</button>
            <button className="h-8 w-8 rounded-full bg-gray-200">
              <ChevronRight className="mx-auto h-4 w-4" />
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">GỢI Ý CHO BẠN</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover"
                  />
                  {item.questions && (
                    <span className="absolute left-2 top-2 rounded bg-white/80 px-2 py-1 text-sm">
                      {item.questions}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-4 line-clamp-2 text-sm">{item.title}</h3>
                  <button className="rounded-full bg-blue-600 px-6 py-1 text-sm text-white hover:bg-blue-700">
                    {item.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button className="h-8 w-8 rounded-full bg-gray-200">1</button>
            <button className="h-8 w-8 rounded-full bg-green-500 text-white">2</button>
            <button className="h-8 w-8 rounded-full bg-gray-200">3</button>
            <span>...</span>
            <button className="h-8 w-8 rounded-full bg-gray-200">6</button>
            <button className="h-8 w-8 rounded-full bg-gray-200">
              <ChevronRight className="mx-auto h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}


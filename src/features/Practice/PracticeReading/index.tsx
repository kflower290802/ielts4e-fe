import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DialogPracticeConfirm from "./components/DialogPracticeConfirm";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question:
      "What do Adam Levine's family do while they were camping beside the lake?",
    options: ["swimming", "swimming", "swimming", "swimming"],
  },
  {
    id: 2,
    question:
      "What do Adam Levine's family do while they were camping beside the lake?",
    options: ["swimming", "swimming", "swimming", "swimming"],
  },
  {
    id: 3,
    question:
      "What do Adam Levine's family do while they were camping beside the lake?",
    options: ["swimming", "swimming", "swimming", "swimming"],
  },
];

export default function PracticeReading() {
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [openDia, setOpenDia] = React.useState<boolean>(false);
  return (
    <div className="h-full p-4 flex justify-between">
      <DialogPracticeConfirm openDia={openDia} setOpenDia={setOpenDia} />
      <Button variant="ghost" className="mb-4 w-fit" size="sm">
        <ArrowLeft className="text-[#164C7E]" />
      </Button>
      <div className="flex flex-col gap-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Section */}
          <Card className="px-8 py-2 h-[74vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-xl text-center font-bold">
                BEAUTIFUL LAKE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-[4/3] h-56 w-full overflow-hidden rounded-lg">
                <img
                  src="https://www.travelandleisure.com/thmb/PtkzpF17oxHfxuTbsnUx7oJY20A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lake-tahoe-california-USLAKES0920-59df9ea26eaf4bbba7620eb604f0af3c.jpg"
                  alt="Beautiful lake view from a wooden boat"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-gray-600">
                A peaceful village in the mountains often conjures images of
                serene, picturesque settings where life moves at a slower pace.
                Such villages are usually nestled amidst lush greenery and
                flanked by towering peaks. They offer a tranquil escape from the
                hustle and bustle of city life, with stunning natural
                surroundings and a relaxed atmosphere. One example is
                Gimmelwald, Switzerland, a small mountain village known for its
                tranquility and beautiful alpine scenery't.
              </p>
              <p className="text-sm text-gray-600">
                These villages provide a haven for those seeking quietude and a
                closer connection to nature. Kayaking is yet another perfect
                lake activity to try. Zach loves to take his kayak out with a
                couple of fishing poles on the back in hopes of catching a huge
                bass! Like paddleboarding, you'll find kayaking to be an awesome
                workout. It's always nice when you can get in a workout and
                still have fun while doing it.
              </p>
            </CardContent>
          </Card>

          {/* Right Section */}
          <Card className="px-8 py-2 h-[74vh] overflow-y-auto">
            <CardHeader className="bg-[#164C7E] text-white rounded-lg">
              <CardTitle>QUESTION 1 - 5</CardTitle>
              <p className="text-sm text-gray-200">
                Choose the correct answer for each question
              </p>
            </CardHeader>
            <CardContent className="pt-6 px-0">
              <div className="space-y-8">
                {questions.map((q) => (
                  <div key={q.id} className="space-y-4 border rounded-lg p-4">
                    <p className="font-medium">
                      {q.id}. {q.question}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Button className="text-sm bg-[#D9D9D9] hover:bg-[#3C64CE] hover:text-white text-black font-bold rounded-full">
                            {["A", "B", "C", "D"][idx]}
                          </Button>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            {Array.from({ length: 10 }, (_, i) => (
              <Button
                key={i}
                className="h-8 w-8 rounded-full p-0 font-bold transition-colors bg-[#D9D9D9] hover:bg-[#3C64CE] hover:text-white"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            className="ml-4 bg-[#3C64CE] hover:bg-[#3C64CE]/80 text-white font-bold rounded-xl"
            onClick={() => setOpenDia(true)}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}

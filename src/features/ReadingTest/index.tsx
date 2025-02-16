import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const ReadingTest = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      {/* Reading Passage */}
      <Card className="p-6 overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold">The Beautiful Beach in Asia</h2>
        <p className="mb-4">
          Found only in the Deep South of America, longleaf pine woodlands have
          dwindled to about 3 percent of their former range, but new efforts are
          under way to restore them.
        </p>
        <p className="text-justify">
          THE BEAUTY AND THE BIODIVERSITY of the longleaf pine forest are
          well-kept secrets, even in its native South. Yet it is among the
          richest ecosystems in North America, rivaling tallgrass prairies and
          the ancient forests of the Pacific Northwest in the number of species
          it shelters. And like those two other disappearing wildlife habitats,
          longleaf is also critically endangered.creates a forest floor that is
          among the mostdiverse in the world, where plants such as many-flowered
          grass pinks, trumpet pitcher plants, Venus flytraps, lavender ladies
          and pineland bog-buttons grow. As many as 50 different species of
          wildflowers, shrubs, grasses
        </p>
      </Card>

      {/* Questions */}
      <Card className="p-6 overflow-y-auto">
        <div className="mb-6 rounded-lg bg-blue-900 p-4 text-white">
          <h3 className="text-lg font-semibold">QUESTION 1 - 5</h3>
          <p>Choose ONE WORD ONLY from the passage for each question</p>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="space-y-2">
              <p className="text-sm">{num}. Sometimes, somebody do something</p>
              <Input
                placeholder="Enter your answer"
                className="max-w-[200px]"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            6 - 9 <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReadingTest;

import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

interface TargetScoreCardProps {
  targetScore: number | undefined;
}

export function TargetScoreCard({ targetScore }: TargetScoreCardProps) {
  return (
    <Card className="border-0 shadow-sm bg-blue-50">
      <CardContent className="p-4 flex items-center gap-2">
        <Target className="h-5 w-5 text-blue-600" />
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-500">TARGET</h3>
          <p className="text-xl font-bold text-blue-600">
            {targetScore?.toFixed(1)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

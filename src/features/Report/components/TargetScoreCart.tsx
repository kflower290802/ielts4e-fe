import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";
import { useUpdateUserTarget } from "../hooks/useUpdateUserTarget";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TargetScoreCardProps {
  targetScore: number | undefined;
  idUser: string | null;
  refetch: () => void;
}

export function TargetScoreCard({ targetScore, idUser, refetch }: TargetScoreCardProps) {
  const { mutateAsync: updateTarget } = useUpdateUserTarget(idUser ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [newTarget, setNewTarget] = useState(targetScore?.toString() || "");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setNewTarget(targetScore?.toString() || "");
  };

  const handleSubmit = async () => {
    const targetValue = parseFloat(newTarget);
    if (!isNaN(targetValue) && targetValue >= 0) {
      await updateTarget({ target: targetValue });
      setIsEditing(false);
      refetch();
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="p-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-gray-500">TARGET</h3>

            {isEditing ? (
              <Input
                type="number"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-20 mt-1"
                step="0.1"
                min="0"
              />
            ) : (
              <p className="text-xl font-bold text-blue-600">
                {targetScore?.toFixed(1)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      {isEditing ? (
        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-300 text-white font-semibold">
            Save
          </Button>
          <Button onClick={handleEditToggle} className="bg-red-500 hover:bg-red-300 text-white font-semibold">
            Cancel
          </Button>
        </div>
      ) : (
        <button
          className="text-blue-600 underline hover:text-blue-300"
          onClick={handleEditToggle}
        >
          Edit Target
        </button>
      )}
    </div>
  );
}

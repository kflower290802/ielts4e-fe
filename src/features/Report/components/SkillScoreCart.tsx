import { Card, CardContent } from "@/components/ui/card"

interface SkillScoreCardProps {
  skill: string
  score?: number
}

export function SkillScoreCard({ skill, score }: SkillScoreCardProps) {
  const roundedScore = score !== undefined ? Math.round(score * 2) / 2 : null;
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4 flex flex-col items-center">
        <h3 className="text-sm font-medium text-gray-500">{skill}</h3>
        <p className="text-2xl font-bold">{roundedScore?.toFixed(1) ?? '...'}</p>
      </CardContent>
    </Card>
  )
}
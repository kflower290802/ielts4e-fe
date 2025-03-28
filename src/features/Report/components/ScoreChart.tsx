import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

interface ScoreChartProps {
  skill: string
  timeRange: string
}

// Mock data
const generateMockData = (skill: string, timeRange: string) => {
  const weeks = ["W1", "W2", "W3", "W4"]

  if (skill === "all") {
    return weeks.map((week) => ({
      name: week,
      Speaking: Math.random() * 2 + 4,
      Reading: Math.random() * 2 + 5,
      Writing: Math.random() * 2 + 4,
      Listening: Math.random() * 2 + 5,
    }))
  } else {
    return weeks.map((week) => ({
      name: week,
      [skill.charAt(0).toUpperCase() + skill.slice(1)]: Math.random() * 2 + 5,
    }))
  }
}

export function ScoreChart({ skill, timeRange }: ScoreChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateMockData(skill, timeRange))
  }, [skill, timeRange])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 9]} ticks={[0, 3, 6, 9]} />
        <Tooltip />
        <Legend />
        {skill === "all" || skill === "speaking" ? (
          <Line type="monotone" dataKey="Speaking" stroke="#ef4444" activeDot={{ r: 8 }} />
        ) : null}
        {skill === "all" || skill === "reading" ? (
          <Line type="monotone" dataKey="Reading" stroke="#3b82f6" activeDot={{ r: 8 }} />
        ) : null}
        {skill === "all" || skill === "writing" ? (
          <Line type="monotone" dataKey="Writing" stroke="#22c55e" activeDot={{ r: 8 }} />
        ) : null}
        {skill === "all" || skill === "listening" ? (
          <Line type="monotone" dataKey="Listening" stroke="#eab308" activeDot={{ r: 8 }} />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  )
}


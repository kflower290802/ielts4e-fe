"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

interface TimeChartProps {
  skill: string
  timeRange: string
}

// Mock data
const generateMockData = (skill: string, timeRange: string) => {
  const weeks = ["W1", "W2", "W3", "W4"]

  if (skill === "all") {
    return weeks.map((week) => ({
      name: week,
      Speaking: Math.floor(Math.random() * 5 + 2),
      Reading: Math.floor(Math.random() * 5 + 3),
      Writing: Math.floor(Math.random() * 5 + 2),
      Listening: Math.floor(Math.random() * 5 + 3),
    }))
  } else {
    return weeks.map((week) => ({
      name: week,
      [skill.charAt(0).toUpperCase() + skill.slice(1)]: Math.floor(Math.random() * 5 + 3),
    }))
  }
}

export function TimeChart({ skill, timeRange }: TimeChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(generateMockData(skill, timeRange))
  }, [skill, timeRange])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
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


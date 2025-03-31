import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TimeChartProps {
  skill: string;
  startDate?: Date;
  endDate?: Date;
}

export function TimeChart({ skill, startDate, endDate }: TimeChartProps) {
  const [data, setData] = useState<any[]>([]);

  const generateMockData = (skill: string, start?: Date, end?: Date) => {
    if (!start || !end) return [];

    const daysDiff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    );
    const dataPoints = Math.min(Math.max(daysDiff, 1), 30);

    const result = [];
    const currentDate = new Date(start);

    for (let i = 0; i < dataPoints && currentDate <= end; i++) {
      const entry: any = {
        name: format(currentDate, "dd/MM"),
      };

      if (skill === "all") {
        entry.Speaking = Math.floor(Math.random() * 5 + 2);
        entry.Reading = Math.floor(Math.random() * 5 + 3);
        entry.Writing = Math.floor(Math.random() * 5 + 2);
        entry.Listening = Math.floor(Math.random() * 5 + 3);
      } else {
        entry[skill.charAt(0).toUpperCase() + skill.slice(1)] = Math.floor(
          Math.random() * 5 + 3
        );
      }

      result.push(entry);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };

  useEffect(() => {
    setData(generateMockData(skill, startDate, endDate));
  }, [skill, startDate, endDate]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
        <Tooltip />
        <Legend />
        {skill === "all" || skill === "speaking" ? (
          <Line
            type="monotone"
            dataKey="Speaking"
            stroke="#ef4444"
            activeDot={{ r: 8 }}
          />
        ) : null}
        {skill === "all" || skill === "reading" ? (
          <Line
            type="monotone"
            dataKey="Reading"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
        ) : null}
        {skill === "all" || skill === "writing" ? (
          <Line
            type="monotone"
            dataKey="Writing"
            stroke="#22c55e"
            activeDot={{ r: 8 }}
          />
        ) : null}
        {skill === "all" || skill === "listening" ? (
          <Line
            type="monotone"
            dataKey="Listening"
            stroke="#eab308"
            activeDot={{ r: 8 }}
          />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
}

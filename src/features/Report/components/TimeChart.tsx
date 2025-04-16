import { useEffect } from "react";
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
import { useGetTimeChart } from "../hooks/useGetTimeChart";
import { IChart } from "@/types/report";
interface TimeChartProps {
  skill: string;
  startDate?: Date;
  endDate?: Date;
}

export function TimeChart({ skill, startDate, endDate }: TimeChartProps) {
  const { data, refetch } = useGetTimeChart({
    startTime: startDate,
    endTime: endDate,
  });

  useEffect(() => {
    refetch();
  }, [startDate, endDate]);
  const TIME_UNIT_CONVERSION = 36000000
  ;

  const chartData =
    (data as IChart[])?.map((item) => {
      const converted = {
        date: item.date,
        reading: Number(item.reading) / TIME_UNIT_CONVERSION,
        writing: Number(item.writing) / TIME_UNIT_CONVERSION,
        speaking: Number(item.speaking) / TIME_UNIT_CONVERSION,
        listening: Number(item.listening) / TIME_UNIT_CONVERSION,
      };
      return converted;
    }) || [];

  const maxValue = Math.max(
    ...chartData.map((d) =>
      Math.max(d.reading, d.writing, d.speaking, d.listening)
    ),
    1
  );
  const yMax = Math.ceil(maxValue * 1.1);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => {
            return new Date(date).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
            });
          }}
        />
        <YAxis
          domain={[0, yMax]}
          tickFormatter={(value) => `${value.toFixed(1)}h`}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toFixed(2)} giờ`, ""]}
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString("vi-VN")
          }
        />
        <Legend />
        {skill === "all" || skill === "speaking" ? (
          <Line
            type="monotone"
            dataKey="speaking"
            name="Speaking"
            stroke="#ef4444"
            activeDot={{ r: 8 }}
          />
        ) : null}
        {skill === "all" || skill === "reading" ? (
          <Line
            type="monotone"
            dataKey="reading"
            name="Reading"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
        ) : null}
        {skill === "all" || skill === "writing" ? (
          <Line
            type="monotone"
            dataKey="writing"
            name="Writing"
            stroke="#22c55e"
            activeDot={{ r: 8 }}
          />
        ) : null}
        {skill === "all" || skill === "listening" ? (
          <Line
            type="monotone"
            dataKey="listening"
            name="Listening"
            stroke="#eab308"
            activeDot={{ r: 8 }}
          />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
}

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetVisit } from "../hooks/useGetVisit";
import { useEffect } from "react";

const data = [
  { name: "T1", visits: 1200 },
  { name: "T2", visits: 1900 },
  { name: "T3", visits: 1500 },
  { name: "T4", visits: 2400 },
  { name: "T5", visits: 2800 },
  { name: "T6", visits: 3800 },
  { name: "T7", visits: 4300 },
  { name: "T8", visits: 3900 },
  { name: "T9", visits: 4800 },
  { name: "T10", visits: 5000 },
  { name: "T11", visits: 4700 },
  { name: "T12", visits: 5500 },
];
interface IProps {
  startDate: Date;
  endDate: Date;
}
export function Overview({ startDate, endDate }: IProps) {
  const { data: visits, refetch } = useGetVisit({ startDate, endDate });
  useEffect(() => {
    refetch();
  }, [startDate, endDate]);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="visits"
          stroke="#0ea5e9"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

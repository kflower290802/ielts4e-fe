import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TargetScoreCard } from "./components/TargetScoreCart";
import { SkillScoreCard } from "./components/SkillScoreCart";
import { ScoreChart } from "./components/ScoreChart";
import { TimeChart } from "./components/TimeChart";
import { HistoryTable } from "./components/HistoryTable";
const Report = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [skill, setSkill] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("month");
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-white rounded-t-lg border-b flex">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <TargetScoreCard targetScore={7.0} />
            </div>
            <SkillScoreCard skill="Speaking" score={5.0} />
            <SkillScoreCard skill="Reading" score={6.0} />
            <SkillScoreCard skill="Writing" score={5.0} />
            <SkillScoreCard skill="Listening" score={7.0} />
            <div className="flex justify-center items-center gap-2 font-medium shadow rounded-lg">
              <span>10 bài học </span> / <span> 2 tiếng</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Filter:</span>
              </div>
              <Select value={skill} onValueChange={setSkill}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="speaking">Speaking</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="listening">Listening</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[150px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {/* <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  /> */}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Test Score</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ScoreChart skill={skill} timeRange={timeRange} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Time to Learn</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <TimeChart skill={skill} timeRange={timeRange} />
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">History</h2>
            <HistoryTable />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;

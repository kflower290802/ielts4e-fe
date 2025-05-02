import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, GraduationCap } from "lucide-react"
import { useTotalBlog, useTotalExam, useTotalPractice } from "../hooks/useGetTotal";
export function StatsCards() {
  const { data: totalExam } = useTotalExam();
  const { data: totalPractice } = useTotalPractice();
  const { data: totalBlogs } = useTotalBlog();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Number of Exams</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalExam}</div>
          <p className="text-xs text-muted-foreground">+12% compared to last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Number of Practice Tests</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPractice}</div>
          <p className="text-xs text-muted-foreground">+4% compared to last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Number of Blogs</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBlogs}</div>
          <p className="text-xs text-muted-foreground">+18% compared to last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

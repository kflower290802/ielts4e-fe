import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "./components/Overview"
import { StatsCards } from "./components/StatsCard"
import { ContentDistribution } from "./components/ContentDistribution"
const AdminHome = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 pt-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Tổng quan về dữ liệu của hệ thống</p>
      </div>

      <div className="space-y-6">
        <StatsCards />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lượt truy cập</CardTitle>
              <CardDescription>Số lượng truy cập theo thời gian</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bố nội dung</CardTitle>
              <CardDescription>Tỷ lệ các loại nội dung trên hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentDistribution />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminHome

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Test {
  id: string
  name: string
  startDate: string
  endDate: string
  result: number
  status: "completed" | "in-progress" | "planned"
}

const mockTests: Test[] = [
  {
    id: "1",
    name: "IELTS Practice Test 1",
    startDate: "2025-03-01",
    endDate: "2025-03-01",
    result: 6.5,
    status: "completed",
  },
  {
    id: "2",
    name: "IELTS Practice Test 2",
    startDate: "2025-03-08",
    endDate: "2025-03-08",
    result: 6.0,
    status: "completed",
  },
  {
    id: "3",
    name: "IELTS Practice Test 3",
    startDate: "2025-03-15",
    endDate: "2025-03-15",
    result: 6.5,
    status: "completed",
  },
  {
    id: "4",
    name: "IELTS Practice Test 4",
    startDate: "2025-03-22",
    endDate: "2025-03-22",
    result: 7.0,
    status: "completed",
  },
  {
    id: "5",
    name: "IELTS Official Test",
    startDate: "2025-03-30",
    endDate: "",
    result: 0,
    status: "planned",
  },
]

export function HistoryTable() {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(mockTests.length / itemsPerPage)

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTests = mockTests.slice(startIndex, endIndex)

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell>{test.startDate}</TableCell>
                <TableCell>{test.endDate || "—"}</TableCell>
                <TableCell>{test.status === "completed" ? test.result.toFixed(1) : "—"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      test.status === "completed" ? "default" : test.status === "in-progress" ? "secondary" : "outline"
                    }
                  >
                    {test.status === "completed"
                      ? "Completed"
                      : test.status === "in-progress"
                        ? "In Progress"
                        : "Planned"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page > 1) setPage(page - 1)
              }}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPage(i + 1)
                }}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page < totalPages) setPage(page + 1)
              }}
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}


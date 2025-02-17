import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetExcercise } from "../hooks/useGetExcercise";
import { useEffect, useState } from "react";
import {
  IRequestExcercise,
  StatusExcercise,
  TypeExcercise,
} from "@/types/excercise";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useGetYear } from "../hooks/useGetYear";
import { examFilters, examTabs, statusFilters } from "@/constant/filter";
import { Link } from "react-router-dom";

export function Exam() {
  const [params, setParams] = useState<IRequestExcercise>({});
  const { data, refetch } = useGetExcercise(params);
  const { data: year } = useGetYear();
  const yearString = Array.isArray(year) ? year.map(String) : [];
  useEffect(() => {
    refetch();
  }, [params]);
  return (
    <div className="flex h-full p-8 gap-14">
      {/* Sidebar */}
      <div className="w-64 border bg-white rounded-lg p-6">
        <div className="space-y-6">
          {/* Status Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Status</h3>
            <div className="space-y-2">
              <RadioGroup
                onValueChange={(value) => {
                  setParams((prev) => ({
                    ...prev,
                    status: value as StatusExcercise,
                  }));
                }}
              >
                {statusFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={filter.id} id={filter.id} />
                    <Label htmlFor={filter.id}>{filter.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Topics Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Year</h3>
            <div className="space-y-2">
              <RadioGroup
                onValueChange={(value) => {
                  setParams((prev) => ({
                    ...prev,
                    year: value,
                  }));
                }}
              >
                {yearString?.map((year) => (
                  <div key={year} className="flex items-center space-x-2">
                    <RadioGroupItem value={year} id={year} />
                    <Label htmlFor={year}>{year}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Question Types Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Exam</h3>
            <div className="space-y-2">
              <RadioGroup>
                {examFilters.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id}>{type.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-between flex-col items-center">
        <Tabs
          defaultValue="reading"
          className="w-full grid-cols-4 gap-6"
          onValueChange={(value) => {
            setParams((prev) => ({ ...prev, type: value as TypeExcercise }));
          }}
        >
          <TabsList className="w-full justify-between">
            {examTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="w-full hover:text-[#164C7E]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {examTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {data?.data?.map((card) => (
                  <Card key={card.id} className="overflow-hidden">
                    <CardContent className="p-0 relative">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-sm">
                        {card.time} min
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center gap-2 p-3">
                      <p className="text-sm text-center">{card.name}</p>
                      <Link to="/reading-test">
                        <Button
                          className={cn(
                            card.status === StatusExcercise.NotStarted
                              ? "border-2 border-[#164C7E] bg-white text-[#164C7E] hover:text-white hover:bg-[#164C7E]"
                              : card.status === StatusExcercise.InProgress
                              ? "border-2 border-[#188F09] text-[#188F09] hover:bg-[#188F09] hover:text-white bg-white"
                              : "border-2 bg-white border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                          )}
                        >
                          {card.status === StatusExcercise.Completed
                            ? "RETRY"
                            : card.status === StatusExcercise.InProgress
                            ? "CONTINUTE"
                            : "START"}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
            </TabsContent>
          ))}
        </Tabs>
        {(data?.data ?? []).length < 8 ? (
          ""
        ) : (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

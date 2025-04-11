import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import {
  IRequestExcercise,
  StatusExcercise,
  TypeExcercise,
} from "@/types/excercise";
import { examTabs } from "@/constant/filter";
import { useSearchParams } from "react-router-dom";
import { formatMillisecondsToMMSS } from "@/utils/time";
import { useGetFullExam } from "./hooks/useGetFullExam";
const AdminExam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<IRequestExcercise>(() => {
    return {
      type: (searchParams.get("type") as TypeExcercise) ?? "reading",
      page: searchParams.get("page")
        ? Number(searchParams.get("page"))
        : undefined,
    };
  });
  const { data, refetch } = useGetFullExam(params);
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (params.type) newSearchParams.set("type", params.type);
    if (params.page != undefined)
      newSearchParams.set("page", params.page.toString());
    setSearchParams(newSearchParams);
  }, [params, setSearchParams]);
  useEffect(() => {
    refetch();
  }, [params]);
  return (
    <div className="h-full p-8 gap-14">
      <div className="flex-1 flex flex-col items-center">
        <Tabs
          value={params.type}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
                {data?.data?.map((card) => {
                  return (
                    <Card key={card.id} className="overflow-hidden">
                      <CardContent className="p-0 relative">
                        <img
                          src={card.image || "/placeholder.svg"}
                          alt={card.name}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-sm">
                          {formatMillisecondsToMMSS(card.time)}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center gap-2 p-3">
                        <p className="text-sm text-center">{card.name}</p>
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
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        {(data?.pages || 0) > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      setParams((prev) => ({
                        ...prev,
                        page: (data?.page ?? 1) - 1,
                      }));
                    }}
                    className={
                      data?.page === 1 ? "opacity-50 pointer-events-none" : ""
                    }
                  />
                </PaginationItem>

                {Array.from(
                  { length: data?.pages ?? 1 },
                  (_, index) => index + 1
                ).map((page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => {
                      setParams((prev) => ({
                        ...prev,
                        page: page,
                      }));
                    }}
                  >
                    <PaginationLink isActive={page === data?.page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      setParams((prev) => ({
                        ...prev,
                        page: (data?.page ?? 1) + 1,
                      }));
                    }}
                    className={
                      data?.page === data?.pages
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminExam;

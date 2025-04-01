import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

export default function PracticeLayout() {
  const { isAuthenticated } = useAuthStore();
  return (
    <div
      className={cn(
        "flex min-h-screen",
        isAuthenticated ? "bg-[#F1FFEF]" : "bg-[#FFDCCC]"
      )}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

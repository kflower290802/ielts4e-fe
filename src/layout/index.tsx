import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

export default function Layout() {
  const { isAuthenticated } = useAuthStore();
  return (
    <div
      className={cn(
        "flex min-h-screen",
        isAuthenticated ? "bg-[#F1FFEF]" : "bg-[#FFDCCC]"
      )}
    >
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

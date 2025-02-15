import { Route } from "@/constant/route";
import { menuItems } from "@/constant/sidebar";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="w-64 bg-white p-4 flex flex-col shadow-lg border-r fixed top-0 left-0 h-screen">
      <div className="mb-8">
        <Link to={Route.Home}>
          <img src="/images/logo.png" alt="I4E Logo" width={150} height={100} />
        </Link>
      </div>
      <div className="space-y-4">
      {menuItems.map((item) => {
          const isActive = pathname === item.href; // Kiểm tra nếu đường dẫn khớp
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center font-bold gap-3 px-4 py-2 text-gray-700 rounded-lg transition 
                ${isActive ? "bg-[#E3FDDF] text-black" : "hover:bg-[#E3FDDF] hover:border-[#E3FDDF]"}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Route } from "@/constant/route";
import { useAuthStore } from "@/store/auth";
import { getStorage } from "@/utils/storage";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const userName = getStorage("userName");
  return (
    <div className="flex items-center h-24 justify-between bg-white sticky top-0 right-0 left-64 z-50 shadow-lg p-10">
      <div className="flex items-center flex-1">
        <div className="relative w-4/5">
          <Input
            placeholder="Search"
            className="w-full p-5 border rounded-xl"
          />
          <div className="absolute bg-[#4E4646] right-0 top-0 w-14 flex items-center justify-center h-full rounded-r-xl">
            <Search className="text-white" />
          </div>
        </div>
      </div>
      {isAuthenticated ? (
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 flex-col">
            <span>{userName}</span>
            <div className="flex items-center justify-between w-full">
              <span>Exp: 1000</span>
              <span>VIP</span>
            </div>
          </div>
          <Link to={Route.Home}>
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to={Route.Login}>
            <Button className="bg-[#66B032] p-5 hover:bg-[#66B032]/80 font-bold rounded-lg">
              LOG IN
            </Button>
          </Link>
          <span className="font-bold">/</span>
          <Link to={Route.SignUp}>
            <Button className="bg-[#66B032] p-5 hover:bg-[#66B032]/80 font-bold rounded-lg">
              SIGN UP
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

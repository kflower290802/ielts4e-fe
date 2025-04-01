import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const Authentication = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  return (
    <div className="px-20 h-full w-full flex items-center justify-center gap-20">
      <div className="w-1/2 text-center h-fit py-10 bg-white px-7 rounded-lg flex items-center justify-center">
        <Tabs
          value={pathname.replace("/", "")} 
          onValueChange={(tab) => nav(tab)}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-up">SIGN UP</TabsTrigger>
            <TabsTrigger value="login">LOGIN</TabsTrigger>
          </TabsList>
          <Outlet />
        </Tabs>
      </div>
      <div className="w-1/2">
        <img
          src="/images/auth.png"
          alt="IELTS Study Materials"
          className="object-cover rounded-lg w-full h-[450px] mx-auto"
        />
      </div>
    </div>
  );
};

export default Authentication;

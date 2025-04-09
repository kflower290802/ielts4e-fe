import { Outlet } from "react-router-dom";
import LearnHeader from "./LearnHeader";

const LearnLayout = () => {
  return (
    <div className="bg-[#F1FFEF] min-h-screen">
      <LearnHeader />
      <div className="w-9/12 bg-white min-h-screen mx-auto shadow-lg p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default LearnLayout;

import { Button } from "@/components/ui/button";
import { Route } from "@/constant/route";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-20 h-full w-full flex items-center justify-center gap-20">
      <div className="w-1/2 text-center flex flex-col justify-between items-center h-[300px]">
        <span className="text-3xl font-bold mb-4">
          DO YOU WANT TO LEARN IELTS BY YOURSELF?
        </span>
        <p className="text-xl mb-8">
          IELTS FOR EVERYONE, a platform that supports self-studying all 4 IELTS
          skills for all ages and levels, COMPLETELY FREE.
        </p>
        <Link to={Route.SignUp} className="w-1/2">
          <Button className="bg-[#66B032] hover:bg-[#66B032]/90 text-white font-bold text-lg px-8 py-6">
            REGISTER FOR FREE NOW
          </Button>
        </Link>
      </div>
      <div className="w-1/2">
        <img
          src="/images/auth.png"
          alt="IELTS Study Materials"
          className="object-cover rounded-lg w-full h-[300px] mx-auto"
        />
      </div>
    </div>
  );
};

export default Home;

import { Button } from "@/components/ui/button";
import { Route } from "@/constant/route";
import { useNavigate } from "react-router-dom";
interface IProps {
  id: string | undefined;
}
const WritingPracticeFooter = ({
  id,
}: IProps) => {
  const nav = useNavigate();
  // const [openDia, setOpenDia] = useState<boolean>(false);
  return (
    <div className="h-20 flex justify-end items-center">
      {/* <DialogSubmitConfirm
        openDia={openDia}
        setOpenDia={setOpenDia}
        totalQuestion={tasks?.length}
        answers={answers}
        id={id}
        route={Route.ExamWritingResult}
      /> */}
        <Button
          className="bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl"
          onClick={() => nav(`${Route.PracticeWritingResult}/${id}`)}
        >
          SUBMIT
        </Button>
    </div>
  );
};

export default WritingPracticeFooter;

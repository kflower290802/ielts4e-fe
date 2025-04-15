import { createExam } from "@/api/AdminAPI/exam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICreateExam } from "@/types/admin";
import { TypeExcercise } from "@/types/excercise";
import { validateError } from "@/utils/validate";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Route } from "@/constant/route";
import StepPractice from "../components/stepPractice";
const CreatePractice = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateExam>({
    defaultValues: {
      name: "",
      type: TypeExcercise.Listening,
      file: undefined,
      audio: undefined,
      year: 2024,
      time: 0,
    },
  });
  const selectedType = watch("type");
  const onSubmit = async (values: ICreateExam) => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value && key !== "file") {
          formData.append(key, value);
        }
      });

      if (values) {
        formData.append("file", values.file[0]);
      }

      const res = await createExam(formData);
      toast.success("Create Exam Success!");
      nav(`${Route.CreateExamDetail}/${res.id}`);
    } catch (error) {
      toast.error(validateError(error));
    } finally {
      setLoading(false);
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => currentYear - index);
  const timeOptions = [
    { label: "15 minutes", value: 15 * 60 * 1000 },
    { label: "30 minutes", value: 30 * 60 * 1000 },
    { label: "1 hour", value: 60 * 60 * 1000 },
    { label: "1 hour 30 minutes", value: 90 * 60 * 1000 },
    { label: "2 hours", value: 120 * 60 * 1000 },
    { label: "2 hours 30 minutes", value: 150 * 60 * 1000 },
    { label: "3 hours", value: 180 * 60 * 1000 },
  ];
  return (
    <div className="h-full w-full p-8 space-y-5">
      <div className="w-9/12 mx-auto">
        <StepPractice step={0} />
      </div>
      <div className="w-10/12 mx-auto bg-white rounded-lg shadow-md p-10">
        <h2 className="text-xl font-bold mb-4 text-center">Create New Practice</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex justify-between w-full gap-5">
              <Label htmlFor="name" className="flex gap-2 w-32">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Reading Practice"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Type Field */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex justify-between w-full gap-5">
              <Label htmlFor="type" className="flex gap-2 w-32">
                Type <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("type", value as TypeExcercise)
                }
                defaultValue={TypeExcercise.Listening}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TypeExcercise.Listening}>
                    Listening
                  </SelectItem>
                  <SelectItem value={TypeExcercise.Reading}>Reading</SelectItem>
                  <SelectItem value={TypeExcercise.Writing}>Writing</SelectItem>
                  <SelectItem value={TypeExcercise.Speaking}>
                    Speaking
                  </SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("type", { required: "Type is required" })}
              />
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* File Field */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex justify-between w-full gap-5">
              <Label htmlFor="file" className="flex gap-2 w-32">
                Image <span className="text-red-500">*</span>
              </Label>
              <Input
                id="file"
                type="file"
                {...register("file", { required: "File is required" })}
              />
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
            )}
          </div>

          {/* Audio Field */}
          <div className="flex items-center gap-5">
            <Label htmlFor="audio" className="w-32">
              Audio
            </Label>
            <Input
              id="audio"
              type="file"
              {...register("audio")}
              disabled={selectedType !== TypeExcercise.Listening}
            />
          </div>

          {/* Year Field */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex justify-between w-full gap-5">
              <Label htmlFor="year" className="flex gap-2 w-32">
                Year <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => setValue("year", Number(value))}
                defaultValue={String(currentYear)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("year", {
                  required: "Year is required",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>

          {/* Time Field */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex justify-between w-full gap-5">
              <Label htmlFor="time" className="flex gap-2 w-32">
                Time <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => setValue("time", Number(value))}
                defaultValue={String(timeOptions[0].value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("time", {
                  required: "Time is required",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            isLoading={loading}
            type="submit"
            className="w-full border-2 border-[#188F09] text-[#188F09] hover:bg-[#188F09] hover:text-white bg-white font-bold"
          >
            Create Basic Practice
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePractice;

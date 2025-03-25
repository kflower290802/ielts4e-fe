import { StatusExcercise, TypeExcercise } from "@/types/excercise";

export const examTabs = [
  { id: TypeExcercise.Reading, label: "READING" },
  { id: TypeExcercise.Listening, label: "LISTENING" },
  { id: TypeExcercise.Writing, label: "WRITING" },
  { id: TypeExcercise.Speaking, label: "SPEAKING" },
];
export const practiceTabs = [
  { id: TypeExcercise.Reading, label: "READING" },
  { id: TypeExcercise.Listening, label: "LISTENING" },
  { id: TypeExcercise.Writing, label: "WRITING" },
  { id: TypeExcercise.Speaking, label: "SPEAKING" },
  { id: TypeExcercise.Grammar, label: "GRAMMAR" },
  { id: TypeExcercise.Vocabulary, label: "VOCABULARY" },
];
export const statusFilters = [
  { id: StatusExcercise.NotStarted, label: "Not Started" },
  { id: StatusExcercise.InProgress, label: "In Progress" },
  { id: StatusExcercise.Completed, label: "Completed" },
];
export const examFilters = [
  { id: "academic", label: "Academic " },
  { id: "general", label: "General" },
];
export const questionTypeFilters = [
  { id: "multiple", label: "Multiple choice " },
  { id: "matching", label: "Matching" },
  { id: "truefalse", label: "True/False/NG" },
];
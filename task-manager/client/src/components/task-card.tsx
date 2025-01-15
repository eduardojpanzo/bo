import { Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import { TaskModel } from "@/models/task.model";

export function TaskItem({ task }: { task: TaskModel }) {
  console.log(task);

  return (
    <div className="bg-background border-2 border-primary/10 rounded-xl px-2 py-3 hover:border-primary text-sm leading-relaxed cursor-pointer select-none transition-all">
      <h4 className="font-semibold capitalize">{task.title}</h4>
      <em className="not-italic">{task.description}</em>{" "}
      <Badge
        variant={"secondary"}
        className="inline-flex gap-1 mx-1 text bg-yellow-400/25 text-yellow-900 hover:bg-yellow-400/25"
      >
        <Calendar size={12} /> Hoje
      </Badge>
    </div>
  );
}

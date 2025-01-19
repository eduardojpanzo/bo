import { Calendar, Edit } from "lucide-react";
import { Badge } from "./ui/badge";
import { TaskModel } from "@/models/task.model";
import { Button } from "./ui/button";
import { useDialog } from "@/contexts/dialog-context";
import { FormTask } from "./section/form-task";

interface TaskProps {
  refetch?: () => Promise<unknown>;
  task: TaskModel;
}

export function TaskItem({ task, refetch }: TaskProps) {
  const { openCustomComponent } = useDialog();

  const handleOpenCustom = (id?: number) => {
    openCustomComponent(FormTask, {
      params: { id, status: task.status },
      handleAccept: async () => {
        await refetch?.();
      },
    });
  };

  return (
    <div className="relative bg-background border-2 border-primary/10 rounded-xl px-2 py-3 hover:border-primary text-sm leading-relaxed cursor-pointer select-none transition-all group">
      <h4 className="font-semibold capitalize">{task.title}</h4>
      <em className="not-italic">{task.description}</em>{" "}
      <Button
        className="absolute right-0 top-0 p-2 bg-transparent border-none shadow-none text-primary hover:bg-primary/20"
        onClick={() => handleOpenCustom(task.id)}
      >
        <Edit className="p-0" size={12} />
      </Button>
      <Badge
        variant={"secondary"}
        className="inline-flex gap-1 mx-1 text bg-yellow-400/25 text-yellow-900 hover:bg-yellow-400/25"
      >
        <Calendar size={12} /> Hoje
      </Badge>
    </div>
  );
}

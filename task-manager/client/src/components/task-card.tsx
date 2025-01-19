import { Calendar, Edit, Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { TaskModel } from "@/models/task.model";
import { Button } from "./ui/button";
import { useDialog } from "@/contexts/dialog-context";
import { FormTask } from "./section/form-task";
import { calcularDistanciaData } from "@/utils";

interface TaskProps {
  refetch?: () => Promise<unknown>;
  task: TaskModel;
  categoryId?: string;
}

export function TaskItem({ task, refetch, categoryId }: TaskProps) {
  const { openCustomComponent } = useDialog();

  const handleOpenCustom = (id?: number) => {
    openCustomComponent(FormTask, {
      params: { id, status: task.status, categoryId },
      handleAccept: async () => {
        await refetch?.();
      },
    });
  };

  return (
    <div className="relative bg-background border-2 border-primary/10 rounded-xl px-2 py-3 hover:border-primary text-sm leading-relaxed cursor-pointer select-none transition-all group max-w-full">
      <h4 className="font-semibold capitalize">{task.title}</h4>
      <em className="not-italic line-clamp-2 break-words mb-1">
        {task.description}
      </em>{" "}
      <div className="absolute right-0 top-0 flex items-center gap-1">
        <Button
          className="p-2 bg-transparent border-none shadow-none text-primary/30 hover:bg-transparent hover:text-primary"
          onClick={() => handleOpenCustom(task.id)}
        >
          <Edit className="p-0" size={12} />
        </Button>
        <Button
          className="p-2 bg-transparent border-none shadow-none text-destructive/30 hover:bg-transparent hover:text-destructive"
          onClick={() => handleOpenCustom(task.id)}
        >
          <Trash className="p-0" size={12} />
        </Button>
      </div>
      <Badge
        variant={"secondary"}
        data-taskStatus={calcularDistanciaData(new Date(task.dueDate!)).status}
        className="inline-flex gap-1 mx-1 text data-[taskStatus=orange]:bg-yellow-400/25 data-[taskStatus=orange]:text-yellow-900 data-[taskStatus=orange]:hover:bg-yellow-400/25 data-[taskStatus=green]:bg-green-400/25 data-[taskStatus=green]:text-green-900 data-[taskStatus=green]:hover:bg-green-400/25 data-[taskStatus=blue]:bg-blue-400/25 data-[taskStatus=blue]:text-blue-900 data-[taskStatus=blue]:hover:bg-blue-400/25"
      >
        <Calendar size={12} />{" "}
        {calcularDistanciaData(new Date(task.dueDate!)).valor}
      </Badge>
    </div>
  );
}

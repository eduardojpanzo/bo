import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TaskItem } from "./task-card";
import { TaskModel } from "@/models/task.model";

export function TasksContainer({
  title,
  desc,
  tasks,
}: {
  title: string;
  desc?: string;
  tasks?: TaskModel[];
}) {
  return (
    <Card className="w-72 max-w-72 p-2 bg-accent rounded-xl">
      <CardHeader className="p-1">
        <CardTitle className="font-medium">{title}</CardTitle>
        <span className="sr-only">{desc}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-1">
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </CardContent>
      <CardFooter className="p-1">
        <Button variant={"ghost"} className="p-3 hover:bg-background">
          <Plus /> <span>Adicionar tarefa</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

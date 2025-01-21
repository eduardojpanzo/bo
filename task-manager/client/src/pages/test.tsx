import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskItem } from "@/components/task-card";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "backlog" | "todo" | "in-progress" | "done";
  duration: number;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface StatusTaskColumn {
  value: "backlog" | "todo" | "in-progress" | "done";
  label: string;
  desc: string;
}

export const StatusTaskColumns: StatusTaskColumn[] = [
  { value: "backlog", label: "Pendente", desc: "" },
  { value: "todo", label: "Para Fazer", desc: "" },
  { value: "in-progress", label: "Em Progresso", desc: "" },
  { value: "done", label: "Feito", desc: "" },
];

const initialTasks: Task[] = [
  {
    id: 5,
    title: "Tarefa de teste",
    description: "alguma descrição sobre a tarefa criada",
    dueDate: "2025-01-16T11:23:00.000Z",
    status: "done",
    duration: 2.25,
    categoryId: 2,
    userId: 6,
    createdAt: "2025-01-19T07:06:49.415Z",
    updatedAt: "2025-01-19T16:53:11.794Z",
  },
  {
    id: 6,
    title: "verificar os bugs",
    description: "alguma descrição da tarefa para fazer hoje",
    dueDate: "2025-01-30T11:12:00.000Z",
    status: "todo",
    duration: 0,
    categoryId: 1,
    userId: 6,
    createdAt: "2025-01-19T07:52:45.080Z",
    updatedAt: "2025-01-19T07:52:45.080Z",
  },
  {
    id: 7,
    title: "fazer o deploy",
    description: "fazer subir as alterações feitas pelo gustavo",
    dueDate: "2025-01-21T11:12:00.000Z",
    status: "done",
    duration: 1.12,
    categoryId: 3,
    userId: 6,
    createdAt: "2025-01-19T07:54:39.088Z",
    updatedAt: "2025-01-21T04:47:06.749Z",
  },
];

export default function Pagetest() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const draggedTaskId = parseInt(active.id as string, 10);
      const targetStatus = over.id as Task["status"];

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === draggedTaskId ? { ...task, status: targetStatus } : task
        )
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex h-auto max-w-max mx-auto gap-4 overflow-y-auto">
        {StatusTaskColumns.map((column) => (
          <DroppableColumn key={column.value} column={column} tasks={tasks} />
        ))}
      </div>
    </DndContext>
  );
}

interface DroppableColumnProps {
  column: StatusTaskColumn;
  tasks: Task[];
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({ id: column.value });

  return (
    <Card
      ref={setNodeRef}
      className="w-72 max-w-72 max-h-[calc(100vh-100px)] min-h-80 grid grid-rows-[minmax(0,32px)_minmax(0,1fr)_minmax(0,48px)] p-2 bg-accent rounded-xl"
    >
      <CardHeader className="p-1">
        <CardTitle className="font-medium">{column.label}</CardTitle>
      </CardHeader>
      <CardContent className="max-w-[230px] flex flex-col gap-3 p-1 pl-0">
        {tasks
          .filter((task) => task.status === column.value)
          .map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </CardContent>
      <CardFooter className="p-1">
        <Button variant="ghost" className="p-3 hover:bg-background">
          <Plus /> <span>Adicionar tarefa</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface DraggableTaskProps {
  task: Task;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id.toString(),
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-2 bg-gray-200 rounded-lg shadow"
    >
      <h4 className="font-bold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
    </div>
  );
};

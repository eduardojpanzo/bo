import { StatusTaskColumns } from "@/data";
import { api } from "@/lib/fecth";
import { TaskModel } from "@/models/task.model";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { TaskItem } from "./task-card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function TasksBaord() {
  const { categoryId } = useParams();
  const loadData = async () => {
    const response = await api(
      `${TaskModel.ENDPOINT}${categoryId ? "/category/" + categoryId : ""}`
    );
    const responseData: HttpResponseDataType<TaskModel[]> =
      await response.json();

    return responseData.data;
  };
  const { data, refetch } = useQuery({
    queryKey: ["tasks-list"],
    queryFn: loadData,
  });

  return (
    <div className="flex h-auto max-w-max  mx-auto gap-4 overflow-y-auto">
      {StatusTaskColumns.map((item) => (
        <Card
          key={item.value}
          className="w-72 max-w-72 max-h-[calc(100vh-100px)] min-h-80 grid grid-rows-[minmax(0,32px)_minmax(0,1fr)_minmax(0,48px)] p-2 bg-accent rounded-xl"
        >
          <CardHeader className="p-1">
            <CardTitle className="font-medium">{item.label}</CardTitle>
            <span className="sr-only">{item.desc}</span>
          </CardHeader>
          <ScrollArea>
            <CardContent className="flex flex-col gap-3 p-1">
              {data
                ?.filter((task) => task.status === item.value)
                ?.map((task) => (
                  <TaskItem refetch={refetch} key={task.id} task={task} />
                ))}
            </CardContent>
          </ScrollArea>
          <CardFooter className="p-1">
            <Button variant={"ghost"} className="p-3 hover:bg-background">
              <Plus /> <span>Adicionar tarefa</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

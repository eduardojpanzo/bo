import { TasksContainer } from "@/components/tasks-container";
import { StatusTaskColumns } from "@/data";
import { gettingData } from "@/lib/fecth";
import { TaskModel } from "@/models/task.model";
import { useEffect, useState } from "react";

export default function DashboardTasks() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const loadData = async () => {
    const resp = await gettingData<HttpResponseDataType<TaskModel[]>>(
      TaskModel.ENDPOINT
    );
    setTasks(resp.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main>
      <div className="flex h-auto max-w-max mx-auto gap-4 overflow-y-auto">
        {StatusTaskColumns.map((item) => (
          <TasksContainer
            key={item.value}
            title={item.label}
            desc={item.desc}
            tasks={tasks.filter((task) => task.status === item.value)}
          />
        ))}
      </div>
    </main>
  );
}

import { TasksContainer } from "@/components/tasks-container";
import { gettingData } from "@/lib/fecth";
import { TaskModel } from "@/models/task.model";
import { useEffect } from "react";

export default function DashboardTasks() {
  const loadData = async () => {
    const allTasks = await gettingData(TaskModel.ENDPOINT);
    console.log(allTasks);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main>
      <div className="flex h-auto gap-4 overflow-y-auto">
        {[1, 2, 3, 4].map((item) => (
          <TasksContainer key={item} />
        ))}
      </div>
    </main>
  );
}

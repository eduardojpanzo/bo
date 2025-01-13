import { TasksContainer } from "@/components/tasks-container";

export default function DashboardTasks() {
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

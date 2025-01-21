import prisma from "../lib/prima";
import { subDays, startOfDay } from "date-fns";

export async function getTasksForChart() {
  const sevenDaysAgo = subDays(new Date(), 7);
  const startOfToday = startOfDay(new Date());

  const tasks = await prisma.task.groupBy({
    by: ["status", "createdAt", "updatedAt"],
    where: {
      createdAt: {
        gte: sevenDaysAgo,
        lt: startOfToday,
      },
    },
    _count: true,
  });

  // Transformar os dados em um formato adequado para o gráfico
  const dailyData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(startOfToday, 5 - i);
    const formattedDate = date.toISOString().split("T")[0]; // Formata como 'YYYY-MM-DD'

    const created = tasks
      .filter(
        (task) => task.createdAt.toISOString().split("T")[0] === formattedDate
      )
      .reduce((sum, task) => sum + task._count, 0);

    const completed = tasks
      .filter(
        (task) =>
          task.status === "done" &&
          task.updatedAt.toISOString().split("T")[0] === formattedDate
      )
      .reduce((sum, task) => sum + task._count, 0);

    return { date: formattedDate, created, completed };
  });

  return dailyData;
}

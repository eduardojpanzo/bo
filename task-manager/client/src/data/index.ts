import { ChartColumn, DotSquare, ListTodo } from "lucide-react";

export const Menudata = {
  navGeral: [
    {
      title: "Resumo",
      url: "/dashboard",
      icon: ChartColumn,
    },
    {
      title: "Todas as tarefas",
      url: "/tasks",
      icon: ListTodo,
    },
  ],
  navCategory: [
    {
      title: "TRabalho Escolar",
      url: "/tasks/categoria",
      icon: DotSquare,
    },
  ],
};

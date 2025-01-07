import { Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

export function TaskItem() {
  return (
    <div className="bg-background border-2 border-transparent rounded-xl px-2 py-3 hover:border-primary text-sm leading-relaxed cursor-pointer select-none transition-all">
      <em className="not-italic">Set up the new development environment</em>{" "}
      <Badge
        variant={"secondary"}
        className="inline-flex gap-1 mx-1 text bg-yellow-400/25 text-yellow-900 hover:bg-yellow-400/25"
      >
        <Calendar size={12} /> Hoje
      </Badge>
    </div>
  );
}

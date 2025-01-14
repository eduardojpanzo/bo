import { ResumeCalendar } from "@/components/resume-calendar";
import { ResumeNumbers } from "@/components/resume-numbers";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-provider";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const { profile } = useAuth();
  return (
    <main className="flex flex-col gap-5 lg:flex-row">
      <section className="flex flex-col gap-8">
        <div className="grid grid-cols-1 w-[620px] h-40 rounded-xl bg-accent sm:grid-cols-2 overflow-hidden">
          <div className="flex flex-col justify-center p-4">
            <strong className="text-3xl font-medium">
              Olá @{profile?.name}
            </strong>
            <span>É bom ver você novamente.</span>
          </div>
          <figure className="hidden relative max-h-40 sm:block">
            <img
              src="/src/assets/art.png"
              alt="art"
              className="absolute top-1/2 -translate-y-1/2"
            />
          </figure>
        </div>

        <div className="flex gap-5 items-center">
          <ResumeNumbers desc="Horas traballhadas" title="11" />
          <ResumeNumbers desc="Tarefas Criadas" title="30" />
          <ResumeNumbers desc="Tarefas concluida" title="17" />
        </div>
      </section>

      <aside className="max-w-96">
        <div className="w-96 h-24 mx-auto flex items-center justify-between p-4 rounded-xl bg-accent">
          <p>
            <strong>Crie tarefa</strong> <br />
            <span>crie uma nova tarefa</span>
          </p>

          <Button>
            <Plus />
          </Button>
        </div>

        <ResumeCalendar />
      </aside>
    </main>
  );
}

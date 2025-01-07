import { Button } from "../ui/button";

export function SiteBanner() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="mt-4 text-center">
          <h2 className="text-4xl leading-snug font-bold uppercase lg:text-6xl lg:leading-[80px]">
            Trasforme as tuas tarefas
          </h2>
          <strong className="text-4xl text-primary leading-snug font-bold uppercase lg:text-6xl lg:leading-[80px]">
            Mais produtivas
          </strong>

          <Button className="block mx-auto mt-10 font-bold" size={"lg"}>
            Começar
          </Button>
        </div>

        <div className="flex min-w-[350px] max-w-[650px] max-h-[550px] min-h-[450px] mx-auto mt-10 overflow-hidden rounded-2xl shadow-xl max-lg:h-fit max-lg:max-h-[320px] max-lg:min-h-[150px] max-lg:w-[320px]">
          <img
            src="/src/assets/dashboard.png"
            alt="dashboard"
            className="h-full w-full object-cover max-lg:object-contain"
          />
        </div>
      </div>
    </section>
  );
}

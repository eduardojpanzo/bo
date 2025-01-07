export default function Dashboard() {
  return (
    <main className="flex flex-col gap-5 lg:flex-row">
      <section>
        <div className="grid grid-cols-1 w-[620px] h-40 rounded-xl bg-accent sm:grid-cols-2 overflow-hidden">
          <div className="flex flex-col justify-center p-4">
            <strong className="text-3xl font-medium">Olá João!</strong>
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
      </section>

      <aside>.....</aside>
    </main>
  );
}

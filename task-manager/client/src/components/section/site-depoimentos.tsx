export default function Depoimentos() {
  return (
    <section
      className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24"
      id="depoimentos"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <img
            className="mx-auto h-8"
            src="/placeholder.svg?height=32&width=160"
            alt="Ntangu"
          />
          <blockquote className="mt-10">
            <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
              <p>
                &ldquo;Ntangu revolucionou a forma como gerencio minhas tarefas
                diárias. É intuitivo, poderoso e aumentou significativamente
                minha produtividade. Não consigo imaginar trabalhar sem ele
                agora!&rdquo;
              </p>
            </div>
            <footer className="mt-8">
              <div className="md:flex md:items-center md:justify-center">
                <div className="md:flex-shrink-0">
                  <img
                    className="mx-auto h-10 w-10 rounded-full"
                    src="/placeholder.svg?height=40&width=40"
                    alt=""
                  />
                </div>
                <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                  <div className="text-base font-medium text-gray-900">
                    Ana Silva
                  </div>

                  <svg
                    className="hidden md:block mx-1 h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 0h3L9 20H6l5-20z" />
                  </svg>

                  <div className="text-base font-medium text-gray-500">
                    Empreendedora
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

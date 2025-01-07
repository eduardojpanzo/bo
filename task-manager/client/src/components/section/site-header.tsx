import { Logo } from "../logo";

export function SiteHeader() {
  return (
    <header className="bg-opacity-0 px-[5%] z-10">
      <div className="container mx-auto flex items-center">
        <Logo />
        <div className="flex h-full w-max gap-5 text-base max-lg:mt-[30px] max-lg:flex-col max-lg:place-items-end max-lg:gap-5 lg:mx-auto lg:place-items-center">
          <a className="hover:text-primary" href="">
            {" "}
            Sobre{" "}
          </a>
          <a className="hover:text-primary" href="">
            {" "}
            Funcionalidade{" "}
          </a>
          <a className="hover:text-primary" href="">
            {" "}
            Testemunhos{" "}
          </a>
        </div>
        <button
          className="bi bi-list absolute right-3 top-3 z-50 text-3xl text-black lg:hidden"
          // onClick="toggleHeader()"
          aria-label="menu"
          id="collapse-btn"
        ></button>
      </div>
    </header>
  );
}

import "./../styles/home.css";

export default function Home() {
  return (
    <div className="flex min-h-[100vh] flex-col bg-[#ffffff]">
      <div className="tw-absolute top-0 flex h-[150px] w-full">
        <div className="header-gradient h-full w-full"></div>
      </div>
      <header className="lgtw-max-w-lg:tw-justify-around max-w-lg:tw-px-4 max-w-lg:tw-mr-auto absolute top-0 z-20 flex h-[60px] w-full bg-opacity-0 px-[5%] text-black">
        <a className="tw-h-[50px] w-[50px] p-[4px]" href="">
          <img
            src="./assets/logo/logo1.png"
            alt="logo"
            className="tw-object h-full w-full"
          />
        </a>
        <div
          className="collapsible-header animated-collapse max-lg:tw-shadow-md"
          id="collapsed-header-items"
        >
          <div className="tw-flex h-full w-max gap-5 text-base text-black max-lg:tw-mt-[30px] max-lg:tw-flex-col max-lg:tw-place-items-end max-lg:tw-gap-5 lg:tw-mx-auto lg:tw-place-items-center">
            <a className="header-links" href="">
              {" "}
              About us{" "}
            </a>
            <a className="header-links" href="#pricing">
              {" "}
              Pricing{" "}
            </a>
            <a className="header-links" href="">
              {" "}
              Features{" "}
            </a>
            <a className="header-links" href="">
              {" "}
              Company{" "}
            </a>
          </div>
          <div className="tw-mx-4 flex place-items-center gap-[20px] text-base max-md:tw-w-full max-md:tw-flex-col max-md:tw-place-content-center">
            <a
              href=""
              aria-label="signup"
              className="tw-rounded-full bg-primary px-3 py-2 text-white transition-transform duration-[0.3s] hover:tw-translate-x-2"
            >
              <span>Get started</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
        <button
          className="bi bi-list absolute right-3 top-3 z-50 text-3xl text-black lg:tw-hidden"
          // onClick="toggleHeader()"
          aria-label="menu"
          id="collapse-btn"
        ></button>
      </header>

      <section className="tw-relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-lg:tw-p-4 max-md:tw-mt-[50px]">
        <div className="tw-flex h-full min-h-[100vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:tw-place-items-center">
          <div className="tw-flex flex-col place-content-center items-center">
            <div className="tw-text-center text-6xl font-semibold uppercase leading-[80px] max-lg:tw-text-4xl max-md:tw-leading-snug">
              <span> Re-imagining the Future </span>
              <br />
              <span className="tw-text-primary"> of Software </span>
            </div>
            <div className="tw-mt-10 max-w-[450px] p-2 text-center max-lg:tw-max-w-full">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
              adipisci corrupti accusamus reiciendis similique assumenda nostrum
              fuga dicta vitae ipsum.
            </div>

            <div className="tw-mt-4 flex place-items-center gap-4 overflow-hidden p-2">
              <a
                className="btn transition-transform duration-[0.3s] hover:tw-scale-x-[1.03]"
                href=""
              >
                Get started
              </a>
              <a
                className="btn !tw-bg-[#c8cbf984] !tw-text-primary transition-transform duration-[0.3s] hover:tw-scale-x-[1.03]"
                href=""
              >
                <span>Learn more</span>
              </a>
            </div>

            <div className="reveal mt-6 flex gap-4 text-2xl"></div>
          </div>

          <div className="tw-flex w-full place-content-center place-items-center overflow-hidden">
            <div className="tw-relative flex w-fit place-content-center place-items-center">
              <div className="tw-flex max-h-[550px] min-h-[450px] min-w-[350px] max-w-[650px] overflow-hidden rounded-2xl shadow-xl max-lg:tw-h-fit max-lg:tw-max-h-[320px] max-lg:tw-min-h-[150px] max-lg:tw-w-[320px]">
                <img
                  src="./assets/images/home/dashboard.png"
                  alt="dashboard"
                  className="tw-h-full w-full object-cover max-lg:tw-object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tw-relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6">
        <div className="tw-flex w-full place-content-center gap-10">
          <div className="tw-h-[30px] w-[150px]">
            <img
              src="./assets/images/brand-logos/google.svg"
              alt="Google"
              className="tw-h-full w-full object-contain grayscale transition-colors hover:tw-grayscale-0"
              srcSet=""
            />
          </div>
          <div className="tw-h-[30px] w-[150px]">
            <img
              src="./assets/images/brand-logos/microsoft.svg"
              alt="Microsoft"
              className="tw-h-full w-full object-contain grayscale transition-colors hover:tw-grayscale-0"
              srcSet=""
            />
          </div>
          <div className="tw-h-[30px] w-[150px]">
            <img
              src="./assets/images/brand-logos/adobe.svg"
              alt="Adobe"
              className="tw-h-full w-full object-contain grayscale transition-colors hover:tw-grayscale-0"
              srcSet=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}

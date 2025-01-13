import { SiteHeader } from "@/components/section/site-header";
import "./../styles/home.css";
import { SiteBanner } from "@/components/section/site-banner";

export default function Home() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <div className="absolute top-0 flex h-[150px] w-full">
        <div className="header-gradient h-full w-full"></div>
      </div>

      <SiteHeader />

      <main className="z-10">
        <SiteBanner />
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
      </main>

      <footer className="z-10">foooter</footer>
    </div>
  );
}

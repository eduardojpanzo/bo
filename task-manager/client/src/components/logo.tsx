import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link className="h-[50px] w-[50px] p-[4px]" to="/">
      <img
        src="./assets/logo/logo1.png"
        alt="logo"
        className="object-contain h-full w-full"
      />
    </Link>
  );
}

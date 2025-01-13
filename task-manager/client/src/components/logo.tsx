import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link className="h-20  w-36" to="/">
      <img
        src="/src/assets/ntangu-verde.svg"
        alt="ntangu logo"
        className="object-contain h-full w-full"
      />
    </Link>
  );
}

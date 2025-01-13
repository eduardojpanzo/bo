import { Navigate, Outlet } from "react-router-dom";

export function Private() {
  const token = localStorage.getItem("ntangu-acess");
  return <div>{token ? <Outlet /> : <Navigate to={"/login"} />}</div>;
}

import { Navigate, Outlet } from "react-router-dom";

export function Private() {
  const token = localStorage.getItem("session-ntangu");
  return <div>{token ? <Outlet /> : <Navigate to={"/login"} />}</div>;
}

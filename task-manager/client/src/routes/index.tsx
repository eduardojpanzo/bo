import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import DashboardTasks from "@/pages/tasks";
import Home from "@/pages/home";

export function RootRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<DashboardTasks />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

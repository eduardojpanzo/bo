import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import DashboardTasks from "@/pages/tasks";
import Home from "@/pages/home";
import DashboardTask from "@/pages/task";

export function RootRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<DashboardTasks />} />
          <Route path="/tasks/:slug" element={<DashboardTask />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

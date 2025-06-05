import { Routes, Route } from "react-router-dom";
import AdminHome from "../pages/Admin/Home/AdminHome";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/home" element={<AdminHome />} />
    </Routes>
  );
}
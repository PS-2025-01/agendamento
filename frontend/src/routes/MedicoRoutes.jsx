import { Routes, Route } from "react-router-dom";
import MedicoHome from "../pages/Medico/MedicoHome";

export default function MedicoRoutes() {
  return (
    <Routes>
      <Route path="/medico/home" element={<MedicoHome />} />
    </Routes>
  );
}
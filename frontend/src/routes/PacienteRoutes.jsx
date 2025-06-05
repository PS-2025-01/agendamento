import { Routes, Route } from "react-router-dom";
import HomePaciente from "../pages/HomePaciente/HomePaciente";

export default function PacienteRoutes() {
  return (
    <Routes>
      <Route path="/paciente/home" element={<HomePaciente />} />
    </Routes>
  );
}
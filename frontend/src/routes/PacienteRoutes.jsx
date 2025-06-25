import { Routes, Route } from "react-router-dom";
import PacienteHome from "../pages/Paciente/PacienteHome";
import PacientePerfil from "../pages/Paciente/PacientePerfil";

export default function PacienteRoutes() {
  return (
    <Routes>
      <Route path="/paciente/home" element={<PacienteHome />} />
      <Route path="/paciente/perfil" element={<PacientePerfil />} />
    </Routes>
  );
}
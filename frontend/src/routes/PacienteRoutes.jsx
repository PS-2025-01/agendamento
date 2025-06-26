import { Routes, Route } from "react-router-dom";
import PacienteHome from "../pages/Paciente/PacienteHome";
import PacienteConsultas from "../pages/Paciente/PacienteConsultas";
import PacientePerfil from "../pages/Paciente/PacientePerfil";

export default function PacienteRoutes() {
  return (
    <Routes>
      <Route path="/paciente/home" element={<PacienteHome />} />
      <Route path="/paciente/consultas" element={<PacienteConsultas />} />
      <Route path="/paciente/perfil" element={<PacientePerfil />} />
    </Routes>
  );
}

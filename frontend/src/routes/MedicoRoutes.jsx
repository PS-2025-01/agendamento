import { Routes, Route } from "react-router-dom";
import MedicoHome from "../pages/Medico/MedicoHome";
import MedicoAgenda from "../pages/Medico/MedicoAgenda";
import MedicoPerfil from "../pages/Medico/MedicoPerfil";
import { GradePage } from "../pages/Medico/Grade";

export default function MedicoRoutes() {
  return (
    <Routes>
      <Route path="/medico/home" element={<MedicoHome />} />
      <Route path="/medico/agenda" element={<MedicoAgenda />} />
      <Route path="/medico/grade" element={<GradePage />} />
      <Route path="/medico/perfil" element={<MedicoPerfil />} />
    </Routes>

    
  );
}
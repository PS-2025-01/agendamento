import { Routes, Route } from "react-router-dom";
import MedicoHome from "../pages/Medico/MedicoHome";
import MedicoAgenda from "../pages/Medico/MedicoAgenda";
import MedicoPerfil from "../pages/Medico/MedicoPerfil";

export default function MedicoRoutes() {
  return (
    <Routes>
      <Route path="/medico/home" element={<MedicoHome />} />
      <Route path="/agenda" element={<MedicoAgenda />} />
      <Route path="/perfil" element={<MedicoPerfil />} />
    </Routes>

    
  );
}
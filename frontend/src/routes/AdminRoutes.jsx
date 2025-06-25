import { Routes, Route } from "react-router-dom";
import AdminHome from "../pages/Admin/AdminHome";
import AdminMedicos from "../pages/Admin/AdminMedicos";
import AdminMedicosHorarios from "../pages/Admin/AdminMedicosHorarios";
// import AdminMedicosCadastro from "../pages/Admin/AdminMedicosCadastro";
import AdminPerfil from "../pages/Admin/AdminPerfil";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/medicos" element={<AdminMedicos />} />
      <Route path="/admin/medicos/horarios" element={<AdminMedicosHorarios />} />
      {/* <Route path="/admin/medicos/cadastro" element={<AdminMedicosCadastro />} /> */}
      <Route path="/admin/perfil" element={<AdminPerfil />} />
    </Routes>
  );
}
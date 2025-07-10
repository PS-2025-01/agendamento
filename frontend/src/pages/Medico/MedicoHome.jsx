import { useState, useEffect } from "react";
import axios from "axios";

import PlannerImg from '../../assets/Planner.svg';
import TasklistImg from '../../assets/Tasklist.svg';
import "./styles.css";
import { Header } from "../../components/Header";
import { useAgendamentos } from "../../hooks/agendamentos";
import { api } from "../../api";

const MedicoHome = () => {
  const [usuario, setUsuario] = useState();

  useEffect(() => {
      const fetchUsuario = async () => {
        const response = await api.get("/api/auth/current");

        if (response.status === 200) {
          setUsuario(response.data);
        }
      };
      
      fetchUsuario();
  }, []);

  const { agendamentos } = useAgendamentos()

  if (!usuario) return <h3>Carregando...</h3>;

  const statusMap = {
    AGENDADO: "Agendado",
    CANCELADO: "Cancelado",
    CONCLUIDO: "Concluido"
  };


  return ( 
    <div className="medico-container">
      <Header />

      <main className="main-content">
        <h2 className="welcome-msg">
          Bem-vindo de volta,<br/>{usuario.nome}!
        </h2>

        <div className="admin-buttons">
          <a href="/medico/agenda">
            <img src={TasklistImg} alt="Consultas" />
            Consultas
          </a>
          <a href="/medico/grade">
            <img src={PlannerImg} alt="Agenda" />
            Grade
          </a>
        </div>
      
      <div className="proximas-consultas">
        <h3>Próximas Consultas</h3>

      <div className="consultas-list" style={{ maxHeight: 480 }}>
         {agendamentos.map((agendamento) => (
          <div key={agendamento.id} className="proximas-consultas-wrapper">
            <div className="proximas-consultas-info">
              <p>{agendamento.paciente}</p>
              <p>{new Date(`${agendamento.data}T00:00:00`).toLocaleDateString()} - {agendamento.horario}</p>
            </div>
            
          <span className={`status-label ${statusMap[agendamento.status].toLowerCase()}`}>
            {statusMap[agendamento.status]}
          </span>
        </div>      
      ))}
    </div>
</div>

 <footer className="footer-medico">
        <p>© 2025 MediAgenda</p>
        <p>Contato: contato@mediagenda.com</p>
    <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>

      </footer>
   
</main>

     </div>
  );
}

export default MedicoHome;

import React, { useState } from "react";
import "./consulta-paciente.css";

const ConsultasPaciente = () => {
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const consultas = [
    {
      id: 1,
      data: "15/04/2024",
      hora: "10:30",
      nome: "Dr. João Souza",
      especialidade: "Cardiologista",
      status: "Agendada",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      data: "12/04/2024",
      hora: "08:00",
      nome: "Dra. Maria Lima",
      especialidade: "Dermatologista",
      status: "Agendada",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      data: "08/04/2024",
      hora: "14:30",
      nome: "Dr. Carlos Alves",
      especialidade: "Ortopedista",
      status: "Cancelada",
      foto: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 4,
      data: "25/03/2024",
      hora: "09:00",
      nome: "Dra. Valeria Silva",
      especialidade: "Clínico Geral",
      status: "Concluída",
      foto: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 5,
      data: "12/03/2024",
      hora: "15:30",
      nome: "Dr. Rodrigo Ferreira",
      especialidade: "Neurologista",
      status: "Concluída",
      foto: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];

  const normalizeStatus = (status) =>
    status
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const consultasFiltradas = consultas.filter((consulta) => {
    if (filtroStatus === "todos") return true;
    return normalizeStatus(consulta.status) === filtroStatus;
  });

  return (
    <div className="consultas-container-root">
      <header className="paciente-header">
        <h3>MediAgenda</h3>
        <nav>
          <ul>
            <li>
              <a href="/paciente/home">Home</a>
            </li>
            <li>
              <a href="/paciente/consultas" className="active">
                Consultas
              </a>
            </li>
            <li>
              <a href="/paciente/perfil">Perfil</a>
            </li>
            <li>
              <a href="/logout">Sair</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="welcome-msg">Consultas</h2>

        <div className="proximas-consultas">
          <label htmlFor="filtro-status" className="select-label">
            Status:
          </label>
          <select
            id="filtro-status"
            className="select-dia"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="agendada">Agendada</option>
            <option value="cancelada">Cancelada</option>
            <option value="concluida">Concluída</option>
          </select>

          <div className="agenda-list">
            {consultasFiltradas.length === 0 ? (
              <p>Nenhuma consulta com esse status.</p>
            ) : (
              consultasFiltradas.map((consulta) => (
                <div key={consulta.id} className="consulta-card">
                  <img
                    src={consulta.foto}
                    alt={consulta.nome}
                    className="consulta-foto"
                  />
                  <div className="consulta-dados">
                    <p className="consulta-nome">{consulta.nome}</p>
                    <p className="consulta-especialidade">
                      {consulta.especialidade}
                    </p>
                    <p className="consulta-datahora">
                      {consulta.data} às {consulta.hora}
                    </p>
                  </div>
                  <div
                    className={`status-badge ${normalizeStatus(
                      consulta.status
                    )}`}
                  >
                    {consulta.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="admin-footer">
        <p>Contato</p>
        <p>Termos de uso</p>
        <p>Política de privacidade</p>
      </footer>
    </div>
  );
};

export default ConsultasPaciente;

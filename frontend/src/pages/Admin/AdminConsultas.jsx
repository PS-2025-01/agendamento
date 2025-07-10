import "./stylesConsultas.css";
import { useState } from "react";
import { Header } from "../../components/Header";
import { useAgendamentos } from "../../hooks/agendamentos"; // Supondo que este hook exista

const AdminConsultas = () => {
    const [filter, setFilter] = useState("");
    const { agendamentos } = useAgendamentos();

    const agendados = agendamentos.filter(agendamento => agendamento.status === "AGENDADO");

    const agendamentosFiltrados = filter === ""
        ? agendados
        : agendados.filter(agendamento =>
            agendamento.paciente.toLowerCase().includes(filter.toLowerCase()) ||
            agendamento.medico.toLowerCase().includes(filter.toLowerCase())
        );

    return (
        <div className="admin-container">
            <Header />

            <main>
                <h2>Consultas Agendadas</h2>

                <input
                    type="text"
                    placeholder="Filtrar por paciente ou médico"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="input-filtro"
                />

                <div className="consultas-list">
                    {agendamentosFiltrados.map((agendamento) => (
                        <div key={agendamento.id} className="proximas-consultas-wrapper">
                            <div className="proximas-consultas-info">
                                <p><strong>Paciente:</strong> {agendamento.paciente}</p>
                                <p><strong>Médico:</strong> {agendamento.medico}</p>
                                <p><strong>Data:</strong> {new Date(`${agendamento.data}T00:00:00`).toLocaleDateString()} - {agendamento.horario}</p>
                            </div>
                            <button className="visualizar-btn">Visualizar</button>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="admin-footer">
                <p>© 2025 MediAgenda</p>
                <p>Contato: contato@mediagenda.com</p>
                <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    );
};

export default AdminConsultas;

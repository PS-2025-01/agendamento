import { Header } from "../../components/Header";
import "./styles.css";
import { useState } from "react";

const PacienteConsultas = () => {
    const [consultas, setConsultas] = useState([
        { id: 1, medico: "Dr. João Pereira", data: "2025-07-15", status: "agendado" },
        { id: 2, medico: "Dr. Carlos Alberto", data: "2025-07-25", status: "agendado" },
    ]);

    const [modalAberto, setModalAberto] = useState(false);
    const [consultaSelecionada, setConsultaSelecionada] = useState(null);

    const formatarData = (dataString) => {
        const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dataString).toLocaleDateString('pt-BR', opcoes);
    };

    const abrirModal = (index) => {
        setConsultaSelecionada(index);
        setModalAberto(true);
    };

    const confirmarCancelamento = () => {
        if (consultaSelecionada !== null) {
            const novasConsultas = [...consultas];
            novasConsultas[consultaSelecionada].status = "cancelado";
            setConsultas(novasConsultas);
            setModalAberto(false);
            setConsultaSelecionada(null);
        }
    };

    const cancelarModal = () => {
        setModalAberto(false);
        setConsultaSelecionada(null);
    };

    return (
        <div className="medico-container">
            <Header />

            <main>
                <h2 className="medico-horarios">Minhas Consultas</h2>

                <div className="medicos-horarios-wrapper-agenda">
                    <div className="select-wrapper">
                        <h3>Consultas Agendadas</h3>
                    </div>

                    <div className="agenda-list">
                        {consultas.map((consulta, index) => (
                            <div key={consulta.id} className="admin-medico-wrapper">
                                <div className="admin-medico-info-wrapper">
                                    <img
                                        className="admin-img"
                                        src="/assets/doctor.png"
                                        alt="Ícone de perfil do médico"
                                    />
                                    <div className="admin-medico-info">
                                        <p>{consulta.medico}</p>
                                        <p>{formatarData(consulta.data)}</p>
                                    </div>

                                </div>

                               <div className="admin-medico-acoes">
                     <span className={`status-label ${consulta.status}`}>
                            {consulta.status === "agendado" ? "Agendado" : "Cancelado"}
                     </span>

                    {consulta.status === "agendado" && (
             <button
                   className="cancelar-btn"
                    onClick={() => abrirModal(index)}
             >     Cancelar Consulta
              </button>
              )}
            </div>

                            </div>
                        ))}
                    </div>
                </div>

                {modalAberto && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Confirmar cancelamento</h3>
                            <p>Você realmente deseja cancelar esta consulta?</p>
                            <div className="modal-botoes">
                                <button className="btn-salvar" onClick={confirmarCancelamento}>
                                    Sim, cancelar
                                </button>
                                <button className="btn-excluir" onClick={cancelarModal}>
                                    Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="admin-footer">
                <p>© 2025 MediAgenda</p>
                <p>Contato: contato@mediagenda.com</p>
                <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    );
};

export default PacienteConsultas;

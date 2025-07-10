import { Header } from "../../components/Header";
import "./styles.css";
import { useAgendamentos } from "../../hooks/agendamentos";
import { useState, useEffect } from "react";
import { api } from "../../api";

const MedicoAgenda = () => {
    const { agendamentos, fetch } = useAgendamentos();
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [diasNoMes, setDiasNoMes] = useState([]);
    const [agendamentosFiltrados, setAgedamentosFiltrados ] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [consultaSelecionada, setConsultaSelecionada] = useState(null);


    useEffect(() => {
        const ano = dataSelecionada.getFullYear();
        const mes = dataSelecionada.getMonth();

        const primeiroDia = new Date(ano, mes, 1);
        const ultimoDia = new Date(ano, mes + 1, 0);
        const dias = [];

        for (let i = 0; i < primeiroDia.getDay(); i++) {
            dias.push(null);
        }

        for (let i = 1; i <= ultimoDia.getDate(); i++) {
            dias.push(new Date(ano, mes, i));
        }

        setDiasNoMes(dias);
    }, [dataSelecionada]);


    useEffect(() => {
        if (agendamentos) {
            setAgedamentosFiltrados(
                agendamentos
                .filter(agendamento => agendamento.data === dataSelecionada.toISOString().split('T')[0])
            )
        }
    }, [dataSelecionada, agendamentos])

    let agendados = 0;
    let cancelados = 0;
    let concluidos = 0;

    for (const agendamento of agendamentosFiltrados) {
        switch (agendamento.status) {
            case "AGENDADO":
                agendados++;
                break;
            case "CANCELADO":
                cancelados++;
                break;
            case "CONCLUIDO":
                concluidos++;
                break;
        }
    }
    
    function mudarMes(delta) {
        const novaData = new Date(dataSelecionada);
        novaData.setMonth(novaData.getMonth() + delta);
        setDataSelecionada(novaData);
    }

    function formatarMesAno(date) {
        return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    }

    function isToday(date) {
        if (!date) return false;
        const hoje = new Date();
        return (
        date.getDate() === hoje.getDate() &&
        date.getMonth() === hoje.getMonth() &&
        date.getFullYear() === hoje.getFullYear()
        );
    }

    function selecionarData(dia) {
        if (!dia) return;
        setDataSelecionada(dia);
    }


    const cancelar = async (agendamentoId) => {        
        await api.patch(`/api/agendamentos/${agendamentoId}/cancel`);
        await fetch();
    };

    const concluir = async (agendamentoId) => {
        await api.patch(`/api/agendamentos/${agendamentoId}/done`);
        await fetch();
    };

    const abrirModal = (id) => {
    setConsultaSelecionada(id);
    setModalAberto(true);
};

const confirmarCancelamento = async () => {
    if (consultaSelecionada !== null) {
        await api.patch(`/api/agendamentos/${consultaSelecionada}/cancel`);
        await fetch();
    }
    setModalAberto(false);
    setConsultaSelecionada(null);
};

const cancelarModal = () => {
    setModalAberto(false);
    setConsultaSelecionada(null);
};

    return (
        <div className="medico-container">
            <Header/>

            <main>
                <h2 className="medico-horarios">
                    Agenda
                </h2>
                
                <div className="medico-horarios-wrapper">
                   <div className="medico-horarios-medico-info">
                         <div className="admin-medico-info-wrapper">
                            <img className="admin-img" src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>Fulano</p>
                                <p>Beltrano</p>
                            </div>
                        </div>
                        <div className="medicos-horarios-medico-consultas">
                            <p>
                                Agendadas: <span>{agendados}</span>
                            </p>
                            <p>
                                Concluídas: <span>{concluidos}</span>
                            </p>
                            <p>
                                Canceladas: <span>{cancelados}</span>
                            </p>                            
                        </div> 
                    </div> 
                    <div className="medicos-horarios-calendario">
                        <section className="calendario" id="calendario">
                            <div className="calendario-header">
                                <button onClick={() => mudarMes(-1)}>◀</button>
                                <div>{formatarMesAno(dataSelecionada)}</div>
                                <button onClick={() => mudarMes(1)}>▶</button>
                            </div>

                            <div className="dias-semana">
                                <span>Dom</span>
                                <span>Seg</span>
                                <span>Ter</span>
                                <span>Qua</span>
                                <span>Qui</span>
                                <span>Sex</span>
                                <span>Sáb</span>
                            </div>

                            <div className="dias">
                            {diasNoMes.map((dia, i) => (
                                <span
                                key={i}
                                className={`
                                    ${dia ? "" : "empty"} 
                                    ${dia && isToday(dia) ? "today" : ""}
                                    ${
                                    dia &&
                                    dia.toDateString() === dataSelecionada.toDateString()
                                        ? "selected"
                                        : ""
                                    }
                                `}
                                onClick={() => selecionarData(dia)}
                                >
                                {dia ? dia.getDate() : ""}
                                </span>
                            ))}
                            </div>
                        </section>
                    </div>
                    <div className="medicos-horarios-wrapper-agenda">
                        {/* <div className="select-wrapper">
                            <h3>Pacientes</h3>
                            <select id="dia-select" className="select-dia">
                                <option value="hoje">Hoje</option>
                                <option value="amanha">Amanhã</option>
                                <option value="semana">Semana</option>
                            </select> 
                        </div> */}
                        <div className="agenda-list">
                           {agendamentosFiltrados.map((consulta, index) => (
    <div key={consulta.id} className="admin-medico-wrapper">
        <div className="admin-medico-info-wrapper">
            <img className="admin-img" src="/assets/account.svg" alt="Ícone de perfil do paciente" />
            <div className="admin-medico-info">
                <p>{consulta.paciente}</p>
                <p>{formatarData(consulta.data)} - {consulta.horario.slice(0, 5)}</p>
            </div>
        </div>

        <div className="admin-medico-acoes">
            {consulta.status === "AGENDADO" && (
                <>
                <button
                    className="concluir-btn"
                    onClick={() => {
                        concluir(consulta.id)
                    }}
                >
                    Concluir
                </button>
                <button
                  className="cancelar-btn"
                  onClick={() => abrirModal(consulta.id)}
                >
                    Cancelar
              </button>

                </>
            )}

            <span className={`status-label ${statusMap[consulta.status].toLowerCase()}`}>
                {statusMap[consulta.status]}
            </span>
        </div>
    </div>
))}

                        </div>
                    </div>
                </div>

            </main>
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


            <footer className="admin-footer">
                <p>© 2025 MediAgenda</p>
        <p>Contato: contato@mediagenda.com</p>
    <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    );
}


export default MedicoAgenda;

const formatarData = (dataString) => {
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', opcoes);
};


const statusMap = {
    "AGENDADO": "Agendado",
    "CANCELADO": "Cancelado",
    "CONCLUIDO": "Concluido"
}
import { useState, useEffect } from "react";
import "./styles.css";
import { Header } from "../../components/Header";import { useAgendamentos } from "../../hooks/agendamentos";
import { api } from "../../api";

const AdminMedicosHorarios = () => {
    const { agendamentos, fetch } = useAgendamentos();
    const [agendamentosFiltrados, setAgedamentosFiltrados ] = useState([]);

    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [diasNoMes, setDiasNoMes] = useState([]);

    const doctor = localStorage.getItem("doctor");
    const [nome, especialidade] = JSON.parse(doctor);

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

    return (
        <div className="admin-container">
            <Header/>

            <main>
                <h2 className="medico-horarios">
                    Horários
                </h2>
                
                <div className="medico-horarios-wrapper">
                    <div className="medico-horarios-medico-info">
                        <div className="admin-medico-info-wrapper">
                            <img className="admin-img" src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>{nome}</p>
                                <p>{especialidade}</p>
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
                        <div className="select-wrapper">
                            <h3>Pacientes</h3>
                        </div>
                        <div className="agenda-list">
                           {agendamentosFiltrados.map((consulta) => (
  <div key={consulta.id} className="admin-medico-wrapper status-card">
    <div className="admin-medico-info-wrapper">
      <img className="admin-img" src="/assets/account.svg" alt="Ícone de perfil do paciente" />
      <div className="admin-medico-info">
        <p>{consulta.paciente}</p>
        <p>{formatarData(consulta.data)} - {consulta.horario.slice(0, 5)}</p>
      </div>
    </div>

    <div className="status-card-conteudo">
      <p>Status: <strong className={`status-${consulta.status.toLowerCase()}`}>{consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1)}</strong></p>

      {consulta.status === "AGENDADO" && (
        <p className="status-msg">Aguardando atendimento. Consulta pode ser cancelada por médico ou paciente.</p>
      )}

      {consulta.status === "CONCLUIDO" && (
        <p className="status-msg">Consulta concluída com sucesso.</p>
      )}

      {consulta.status === "CANCELADO" && (
        <p className="status-msg">Consulta foi cancelada por uma das partes.</p>
      )}
    </div>
  </div>
))}


                        </div>
                    </div>
                </div>

            </main>

            <footer className="admin-footer">
                <p>© 2025 MediAgenda</p>
        <p>Contato: contato@mediagenda.com</p>
    <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    );
}

export default AdminMedicosHorarios

const formatarData = (dataString) => {
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', opcoes);
};


const statusMap = {
    "AGENDADO": "Agendado",
    "CANCELADO": "Cancelado",
    "CONCLUIDO": "Concluido"
}
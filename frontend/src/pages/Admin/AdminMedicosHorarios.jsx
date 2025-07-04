import { useState, useEffect } from "react";
import "./styles.css";
import { Header } from "../../components/Header";

const AdminMedicosHorarios = () => {
    const consultas = [
        { id: 1, nome: "Mariana Souza" },
        { id: 2, nome: "João Pereira" },
        { id: 3, nome: "Ana Souza" },
        { id: 4, nome: "Carlos Alberto" },
        { id: 5, nome: "Joana Medeiros" },
        { id: 6, nome: "Isabela Silva" },
    ];

    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
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
        setHorarioSelecionado(null);
    }

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
                                Agendadas: <span>5</span>
                            </p>
                            <p>
                                Concluídas: <span>10</span>
                            </p>
                            <p>
                                Canceladas: <span>1</span>
                            </p>
                            <p>
                                Horas vagas: <span>10</span>
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
                            <select id="dia-select" className="select-dia">
                                <option value="hoje">Hoje</option>
                                <option value="amanha">Amanhã</option>
                                <option value="semana">Semana</option>
                            </select>
                        </div>
                        <div className="agenda-list">
                            {consultas.map((consultas) => (
                                <div key={consultas.id} className="admin-medico-wrapper">
                                    <div className="admin-medico-info-wrapper">
                                        <img className="admin-img" src="/assets/account.svg" alt="Ícone de perfil do paciente" />
                                        <div className="admin-medico-info">
                                            <p>{consultas.nome}</p>
                                            <p>Data a definir</p>
                                        </div>
                                    </div>
                                    <button className="agenda-btn">Agendada</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>

            <footer className="admin-footer">
                <p>Contato</p>
                <p>Termos de uso</p>
                <p>Política de privacidade</p>
                <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    );
}

export default AdminMedicosHorarios
import React, { useState, useEffect } from "react";
import "./styles.css";

const medicosDados = [
  {
    id: 1,
    nome: "Dr. João Silva",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
    especialidade: "Cardiologista",
  },
  {
    id: 2,
    nome: "Dra. Maria Souza",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
    especialidade: "Dermatologista",
  },
  {
    id: 3,
    nome: "Dr. Carlos Pereira",
    foto: "https://randomuser.me/api/portraits/men/45.jpg",
    especialidade: "Ortopedista",
  },
  {
    id: 4,
    nome: "Dra. Ana Lima",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
    especialidade: "Clínico Geral",
  },

  {
    id: 5,
    nome: "Dr. Rodrigo Ferreira",
    especialidade: "Neurologista",
    foto: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    id: 6,
    nome: "Dra. Valéria Martins",
    especialidade: "Ginecologista",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const horariosDisponiveis = ["09:00", "10:30", "14:00", "15:30"];

function Agendamento() {
  const [buscaMedico, setBuscaMedico] = useState("");
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [diasNoMes, setDiasNoMes] = useState([]);

  const medicosFiltrados = medicosDados.filter((medico) =>
    medico.nome.toLowerCase().includes(buscaMedico.toLowerCase())
  );

  useEffect(() => {
    const ano = dataSelecionada.getFullYear();
    const mes = dataSelecionada.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const dias = [];

    for (let i = 0; i < primeiroDia.getDay(); i++) dias.push(null);
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

  function selecionarData(dia) {
    if (!dia) return;
    setDataSelecionada(dia);
    setHorarioSelecionado(null);
  }

  function finalizarAgendamento() {
    if (!medicoSelecionado || !dataSelecionada || !horarioSelecionado) {
      alert("Por favor, selecione médico, data e horário.");
      return;
    }

    alert(
      `Agendamento confirmado!\n\nMédico: ${
        medicoSelecionado.nome
      }\nData: ${dataSelecionada.toLocaleDateString()}\nHorário: ${horarioSelecionado}`
    );
  }

  return (
    <div className="paciente-container">
      <header className="header">
        <h3>MediAgenda</h3>
        <nav>
          <ul>
            <li>
              <a href="/paciente/home">Home</a>
            </li>
            <li>
              <a href="/paciente/consultas">Consultas</a>
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

      <main className="agendamento-main">
        <h2>Agendar Consulta</h2>
        <div className="agendamento-grid">
          <div className="col-esquerda">
            <section className="box-medicos">
              <h3>Escolha o médico</h3>
              <input
                type="text"
                placeholder="Buscar por nome ou especialidade"
                value={buscaMedico}
                onChange={(e) => setBuscaMedico(e.target.value)}
              />
              <div className="lista-medicos">
                {medicosFiltrados.map((medico) => (
                  <div key={medico.id} className="medico-card">
                    <img src={medico.foto} alt={medico.nome} />
                    <div>
                      <p className="medico-nome">{medico.nome}</p>
                      <p className="medico-especialidade">
                        {medico.especialidade}
                      </p>
                    </div>
                    <button
                      className={
                        medicoSelecionado?.id === medico.id ? "selecionado" : ""
                      }
                      onClick={() => setMedicoSelecionado(medico)}
                    >
                      {medicoSelecionado?.id === medico.id
                        ? "Selecionado"
                        : "Selecionar"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="finalizar-container">
              <h3>Concluir Agendamento</h3>
              <button className="finalizar" onClick={finalizarAgendamento}>
                Finalizar
              </button>
            </div>
          </div>

          <div className="col-direita">
            <section className="box-calendario">
              <h3>Escolha a data</h3>
              <div className="calendario-header">
                <button onClick={() => mudarMes(-1)}>◀</button>
                <div>{formatarMesAno(dataSelecionada)}</div>
                <button onClick={() => mudarMes(1)}>▶</button>
              </div>
              <div className="calendario-dias">
                {diasNoMes.map((dia, i) => (
                  <span
                    key={i}
                    className={`dia ${
                      dia &&
                      dia.toDateString() === dataSelecionada.toDateString()
                        ? "selecionado"
                        : ""
                    }`}
                    onClick={() => selecionarData(dia)}
                  >
                    {dia ? dia.getDate() : ""}
                  </span>
                ))}
              </div>
            </section>

            <section className="box-horarios">
              <h3>Escolha a hora</h3>
              {horariosDisponiveis.map((hora) => (
                <div
                  key={hora}
                  className={`horario ${
                    horarioSelecionado === hora ? "selected" : ""
                  }`}
                  onClick={() => setHorarioSelecionado(hora)}
                >
                  {hora}
                </div>
              ))}
            </section>
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
}

export default Agendamento;

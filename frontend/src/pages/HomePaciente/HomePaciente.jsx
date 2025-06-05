import React, { useState, useEffect } from "react";
import "./styles.css";

const medicosDados = [
  {
    id: 1,
    nome: "Dr. João Silva",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    nome: "Dra. Maria Souza",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    nome: "Dr. Carlos Pereira",
    foto: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    nome: "Dra. Ana Lima",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const horariosDisponiveis = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

function Agendamento() {
  const [buscaMedico, setBuscaMedico] = useState("");
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [diasNoMes, setDiasNoMes] = useState([]);

  // Filtra médicos pelo nome
  const medicosFiltrados = medicosDados.filter((medico) =>
    medico.nome.toLowerCase().includes(buscaMedico.toLowerCase())
  );

  // Gera os dias do mês para mostrar no calendário
  useEffect(() => {
    const ano = dataSelecionada.getFullYear();
    const mes = dataSelecionada.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const dias = [];

    // Preenche os dias vazios até o primeiro dia da semana (para alinhamento)
    for (let i = 0; i < primeiroDia.getDay(); i++) {
      dias.push(null);
    }

    // Preenche os dias do mês
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(ano, mes, i));
    }

    setDiasNoMes(dias);
  }, [dataSelecionada]);

  // Muda mês (antes ou depois)
  function mudarMes(delta) {
    const novaData = new Date(dataSelecionada);
    novaData.setMonth(novaData.getMonth() + delta);
    setDataSelecionada(novaData);
  }

  // Formata a data para mostrar no header do calendário
  function formatarMesAno(date) {
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  }

  // Verifica se a data é hoje
  function isToday(date) {
    if (!date) return false;
    const hoje = new Date();
    return (
      date.getDate() === hoje.getDate() &&
      date.getMonth() === hoje.getMonth() &&
      date.getFullYear() === hoje.getFullYear()
    );
  }

  // Quando clicar no dia do calendário
  function selecionarData(dia) {
    if (!dia) return;
    setDataSelecionada(dia);
    setHorarioSelecionado(null); // limpa horário selecionado ao mudar o dia
  }

  // Quando clicar no botão finalizar
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
    // Aqui você pode mandar os dados para API ou backend
  }

  return (
    <div>
      <header>
        <div className="logo">MediAgenda</div>
        <nav>
          <a href="#medicos" className="active">
            Médicos
          </a>
          <a href="#calendario">Calendário</a>
          <a href="#horarios">Horários</a>
        </nav>
      </header>

      <main>
        <h1>Agendar Consulta</h1>

        <div className="agendamento-container">
          {/* Lista de Médicos */}
          <section className="medicos" id="medicos">
            <input
              type="text"
              placeholder="Buscar médico..."
              value={buscaMedico}
              onChange={(e) => setBuscaMedico(e.target.value)}
            />
            <div className="lista-medicos">
              {medicosFiltrados.map((medico) => (
                <div key={medico.id} className="medico">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={medico.foto} alt={medico.nome} />
                    <span>{medico.nome}</span>
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

          {/* Calendário */}
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

          {/* Horários */}
          <section className="horarios" id="horarios">
            <h2>Horários disponíveis</h2>
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

        <div className="finalizar-container">
          <button className="finalizar" onClick={finalizarAgendamento}>
            Finalizar Agendamento
          </button>
        </div>
      </main>

      <footer>
        <div>© 2025 ClinApp</div>
        <div>Contato: contato@clinapp.com</div>
      </footer>
    </div>
  );
}

export default Agendamento;

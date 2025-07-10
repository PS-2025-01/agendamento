import { useState, useEffect } from "react";

import { useMedicos } from "../../hooks/medicos";
import { useHorarios } from "../../hooks/horarios";
import { Calendario } from "./Calendario";
import { api } from "../../api";
import "./styles.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";


function PacienteHome() {
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [buscaMedico, setBuscaMedico] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const [usuario, setUsuario] = useState();
  const { medicos } = useMedicos();
  const horariosDisponiveis = useHorarios(medicoSelecionado, dataSelecionada);
  
  useEffect(() => {
    const fetchUsuario = async () => {
      const response = await api.get("/api/auth/current");
      setUsuario(response.data);
    };
    
    fetchUsuario();
  }, []);

  // Filtra médicos pelo nome
  const medicosFiltrados = medicos.filter((medico) =>
    medico.nome.toLowerCase().includes(buscaMedico.toLowerCase())
  );

  // Quando clicar no botão finalizar
  async function finalizarAgendamento() {
    if (!medicoSelecionado || !dataSelecionada || !horarioSelecionado) {
      alert("Por favor, selecione médico, data e horário.");
      return;
    }

    const response = await api.post("/api/agendamentos", {
      medicoId: medicoSelecionado.id,
      data: dataSelecionada.toISOString().split('T')[0],
      horario: horarioSelecionado
    });

    if (response.status < 400) {
      alert(
        `Agendamento confirmado!\n\nMédico: ${
          medicoSelecionado.nome
        }\nData: ${dataSelecionada.toLocaleDateString()}\nHorário: ${horarioSelecionado}`
      );
    }
  }

  if (!usuario) return <h3>Carregando...</h3>;

  return (
    <div className="admin-container">
      <Header />

      <main>
        <h3>Bem vindo, {usuario.nome}!</h3>
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
                <div key={medico.id} className="medico" style={
                  { display: "flex", justifyContent: "space-between", gap: 12}
                }>
                  <span style={{textWrap: "nowrap", overflow: "hidden"}}>{medico.nome}</span>
            
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
          <Calendario 
            dataSelecionada={dataSelecionada} 
            setDataSelecionada={setDataSelecionada} 
            medico={medicoSelecionado}
          />

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

      <Footer />
    </div>
  );
}

export default PacienteHome;

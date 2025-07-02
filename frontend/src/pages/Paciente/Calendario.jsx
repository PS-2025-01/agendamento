import { useEffect, useState } from "react";
import { useGrades } from "../../hooks/grades";

export const Calendario = ({ dataSelecionada, setDataSelecionada, medico }) => {
  const [diasNoMes, setDiasNoMes] = useState([]);
  const grades = useGrades(medico);
  
  const diasDaSemana = grades.map(grade => grade.dia);
  
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

  function mudarMes(delta) {
    const novaData = new Date(dataSelecionada);
    novaData.setMonth(novaData.getMonth() + delta);
    setDataSelecionada(novaData);
  }

  return (
    <section className="calendario" id="calendario">
        <div className="calendario-header">
          <button onClick={() => mudarMes(-1)} style={
            { border: "none", padding: 6, borderRadius: 4 }
          }>◀</button>
          <div>{formatarMesAno(dataSelecionada)}</div>
          <button onClick={() => mudarMes(1)} style={
            { border: "none", padding: 6, borderRadius: 4}
          }>▶</button>
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
            <button
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
              onClick={() => setDataSelecionada(dia)}
              disabled={dia && !diasDaSemana.includes(dia.getDay())}
            >
              {dia ? dia.getDate() : ""}
            </button>
          ))}
        </div>
    </section>
  )
}


// Muda mês (antes ou depois)


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
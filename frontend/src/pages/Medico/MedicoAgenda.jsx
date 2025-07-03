import { Header } from "../../components/Header";
import "./styles.css";
import { useAgendamentos } from "../../hooks/agendamentos";

const MedicoAgenda = () => {
  const agendamentos = useAgendamentos();

  return ( 
    <div className="medico-container">
      <Header />

      <main className="main-content">
        <h2 className="welcome-msg"> Agenda </h2>
       
      <div className="proximas-consultas">
        <label className="select-label" htmlFor="dia-select"></label>
      <select id="dia-select" className="select-dia">
        <option value="hoje">Hoje</option>
        <option value="amanha">Amanhã</option>
        <option value="semana">Semana</option>
        
      </select>

        <div className="agenda-list">
          {agendamentos.map((agendamento) => (
           <div key={agendamento.id} className="proximas-consultas-wrapper">
            <div className="medico-info-wrapper">
              <img className="admin-img" src="/assets/account.svg" alt="Ícone de perfil do paciente" />
              <div className="proximas-consultas-info">
                <p>{agendamento.paciente}</p>
                <p>{new Date(agendamento.data).toLocaleDateString()} - {agendamento.horario}</p>
              </div>
            </div>
         <button className="agenda-btn">Agendada</button>
      </div>
    ))}
  </div>
</div>

<footer-medico>
    <div>© 2025 MediAgenda</div>
    <div>Contato: contato@mediagenda.com</div>
    <div>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</div>

</footer-medico>
   
</main>

     </div>
  );
}

export default MedicoAgenda;
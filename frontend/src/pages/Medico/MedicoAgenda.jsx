import "./styles.css";

const MedicoAgenda = () => {
  const consultas = [
    { id: 1, nome: "Mariana Souza" },
    { id: 2, nome: "João Pereira" },
    { id: 3, nome: "Ana Souza" },
    { id: 4, nome: "Carlos Alberto" },
    { id: 5, nome: "Joana Medeiros" },
    { id: 6, nome: "Isabela Silva" },

  ];

  return ( 
    <div className="medico-container">
      <header className="header">
       <h3>MediAgenda</h3>
        <nav>
          <ul>
            <li><a href="/medico/home">Home</a></li>
            <li><a href="/medico/agenda">Agenda</a></li>
            <li><a href="/medico/perfil">Perfil</a></li>
            <li><a href="/logout">Sair</a></li>
          </ul>
        </nav>
      </header>

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
          {consultas.map((consulta) => (
           <div key={consulta.id} className="proximas-consultas-wrapper">
            <div className="medico-info-wrapper">
              <img className="admin-img" src="/assets/account.svg" alt="Ícone de perfil do paciente" />
              <div className="proximas-consultas-info">
                <p>{consulta.nome}</p>
                <p>Data a definir</p>
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
</footer-medico>
   
</main>

     </div>
  );
}

export default MedicoAgenda;
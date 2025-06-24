import PlannerImg from '../../assets/Planner.svg';
import TasklistImg from '../../assets/Tasklist.svg';
import "./styles.css";

const MedicoHome = () => {
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
            <li><a href="/agenda">Agenda</a></li>
            <li><a href="/perfil">Perfil</a></li>
            <li><a href="/logout">Sair</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="welcome-msg">
        Bem-vindo de volta,<br/>Dr. João Souza!
        </h2>

        <div className="admin-buttons">
          <a href="/consultas">
            <img src={TasklistImg} alt="Consultas" />
            Consultas
          </a>
          <a href="/agenda">
            <img src={PlannerImg} alt="Agenda" />
            Agenda
          </a>
        </div>
      
      <div className="proximas-consultas">
        <h3>Próximas Consultas</h3>

        <div className="consultas-list">
          {consultas.map((consulta) => (
           <div key={consulta.id} className="proximas-consultas-wrapper">
           <div className="proximas-consultas-info">
             <p>{consulta.nome}</p>
             <p>Data a definir</p>
         </div>
         <button className="visualizar-btn">Visualizar</button>
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

export default MedicoHome;

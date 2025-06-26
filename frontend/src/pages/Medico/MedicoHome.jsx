import { useState, useEffect } from "react";
import axios from "axios";

import PlannerImg from '../../assets/Planner.svg';
import TasklistImg from '../../assets/Tasklist.svg';
import "./styles.css";

const MedicoHome = () => {
  const [usuario, setUsuario] = useState();

  useEffect(() => {
      const fetchUsuario = async () => {
      const token = localStorage.getItem("token");

      try {
          const response = await axios.get("/api/auth/current", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          });

          setUsuario(response.data);
      } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
      }
      };
      
      fetchUsuario();
  }, []);

  const consultas = [
    { id: 1, nome: "Mariana Souza" },
    { id: 2, nome: "João Pereira" },
    { id: 3, nome: "Ana Souza" },
    { id: 4, nome: "Carlos Alberto" },
    { id: 5, nome: "Joana Medeiros" },
    { id: 6, nome: "Isabela Silva" },

  ];

  if (!usuario) return <h3>Carregando...</h3>;

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
          Bem-vindo de volta,<br/>{usuario.nome}!
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
    <div>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</div>

      </footer-medico>
   
</main>

     </div>
  );
}

export default MedicoHome;

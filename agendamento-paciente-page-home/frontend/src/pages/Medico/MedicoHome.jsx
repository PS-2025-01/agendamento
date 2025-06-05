import React, { useState } from "react";
import axios from "axios";

import "./styles.css";

const MedicoHome = () => {
  const consultas = [
    { id: 1, nome: "Mariana Souza" },
    { id: 2, nome: "João Pereira" },
    { id: 3, nome: "Ana Souza" },
    { id: 4, nome: "Carlos Alberto" }
  ];

  return ( 
    <div className="home-container">
      <header className="header">
        <h1>MediAgenda</h1>
        <nav className="nav-menu">
          <a href="/medico/home">Home</a> 
          <a href="/agenda">Agenda</a>
          <a href="/perfil">Perfil</a>
          <a href="/logout">Sair</a>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="welcome-msg">
        Bem-vindo de volta,<br/>Dr. João Souza!
        </h2>

        <div className="cards-container">
          <a href="/consultas" className="card">Consultas</a>
          <a href="/agenda" className="card">Agenda</a>
        </div>

        <section className="proximas-consultas">
          <h3>Próximas Consultas</h3>
          <div className="consultas-list">
            {consultas.map((consulta) => (
              <div key={consulta.id} className="consulta-item">
                <span>{consulta.nome}</span>
                <button className="visualizar-btn">Visualizar</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MedicoHome;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles.css";

const Signup = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  
  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("/api/auth/signup", {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
      });
      // Se a API responder com sucesso
      console.log("Signup realizado com sucesso:", response.data);
      alert("Cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer signup:", error);
      setErro("Ocorreu um erro, tente novamente.");
      alert("foi não, divo");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h3>Cadastre-se</h3>

        <div className="input-wrapper">
          <label htmlFor="nome">Nome:</label>
          <input 
            type="text" 
            placeholder="Seu nome"
            className="input-field" 
            name="nome" 
            onChange={(e) => setNome(e.target.value)}
            required 
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="cpf">CPF (somente números):</label>
          <input 
            type="number" 
            placeholder="12345678900"
            className="input-field" 
            name="cpf" 
            onChange={(e) => setCPF(e.target.value)}
            required 
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">E-mail:</label>
          <input 
            type="email" 
            placeholder="usuario@exemplo.com"
            className="input-field" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            placeholder="••••••"
            className="input-field" 
            name="password" 
            onChange={(e) => setSenha(e.target.value)}
            required 
          />
        </div>

        <input 
          type="submit" 
          value="Signup" 
          className="submit-btn" 
        />

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <a href="/" className="back-link">Voltar</a>
      </form>
    </div>
  )
}

export default Signup
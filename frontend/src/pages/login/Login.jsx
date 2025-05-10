import React, { useState } from "react";
import axios from "axios";

import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: email,
        senha: senha,
      });
      // Se a API responder com sucesso
      console.log("Login realizado com sucesso:", response.data);
      alert("foi, divo");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Email ou senha inválidos.");
      alert("foi não, divo");
    }
  };

  return (
    <div className="login-container">
      <h1>MediAgenda</h1>

      <form onSubmit={handleLogin} className="login-form">
        <h3>Entrar</h3>

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
          value="Login" 
          className="submit-btn" 
        />

        {erro && <p style={{ color: "red" }}>{erro}</p>}
        
        <a href="#" className="forgot-pass-link">Esqueci minha senha</a>
      </form>
    </div>
  )
}

export default Login
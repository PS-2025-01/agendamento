import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../api";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/login",{
        email: email,
        senha: senha,
      });
      // Se a API responder com sucesso
      localStorage.setItem('token', response.data.access_token);
      navigate("/paciente/home");
    } catch (error) {
      console.error(error);
      setErro("Email ou senha inválidos.");
      toast.error("Email ou senha inválidos.");
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

        <a href="/signup" className="signup-link">Cadastre-se</a>
      </form>
    </div>
  )
}

export default Login
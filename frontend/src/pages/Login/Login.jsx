import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../api";
import "./styles.css";

const redirectMap = {
  "paciente": "/paciente/home",
  "admin": "/admin/home",
  "medico": "/medico/home"
}

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
      localStorage.setItem('acesso', response.data.acesso);
      console.log(response.data);
      navigate(redirectMap[response.data.acesso]);

    } catch (error) {
      console.error(error);
      setErro("Email ou senha inválidos.");
      toast.error("Email ou senha inválidos.");
    }
  };

  return (
    <div className="container">
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
    </div>
  )
}

export default Login
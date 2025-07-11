import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import "./styles.css";
import { Header } from "../../components/Header";

const AdminMedicosCadastro = () => {
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post("/api/auth/register", {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha,
                tipoUsuario: "medico",
                especialidade: especialidade
            });
            // Se a API responder com sucesso
            console.log("Register realizado com sucesso:", response.data);
            alert("Médico cadastrado com sucesso!");
            navigate("/admin/medicos");
        } catch (error) {
            console.error("Erro ao fazer cadastro:", error);
            setErro("Ocorreu um erro, tente novamente.");
            alert("foi não, divo");
        }
    };

    return (
        <div className="admin-container">
            <Header />

            <main className="admin-home">
                <h2>
                    Cadastrar novo médico
                </h2>

                <form onSubmit={handleRegister} className="register-form">
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
                    <label htmlFor="especialidade">Especialidade:</label>
                    <input 
                        type="text" 
                        placeholder="Ex.: Cardiologista"
                        className="input-field" 
                        name="especialidade" 
                        onChange={(e) => setEspecialidade(e.target.value)}
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
                    value="Cadastrar médico" 
                    className="submit-btn" 
                    />

                    {erro && <p style={{ color: "red" }}>{erro}</p>}

                    <a href="/admin/medicos" className="back-link">Voltar</a>
                </form>

            </main>

            <footer className="admin-footer">
                <p>© 2025 MediAgenda</p>
        <p>Contato: contato@mediagenda.com</p>
    <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    )
}

export default AdminMedicosCadastro
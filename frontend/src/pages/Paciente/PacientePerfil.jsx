import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const PacientePerfil = () => {
    const [usuario, setUsuario] = useState(null);

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

    return (
        <div className="admin-container">
            <header>
                <h3>MediAgenda</h3>
                <nav>
                    <ul>
                        <li>
                            <a href="/paciente/home">Home</a>
                        </li>
                        <li>
                            <a href="/paciente/horarios">Horários</a>
                        </li>
                        <li>
                            <a href="/paciente/perfil">Perfil</a>
                        </li>
                        <li>
                            <a href="/logout">Sair</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="main-content">
                <h2 className="perfil-msg"> Perfil </h2>
            
                <div className="perfil-coluna">
                    <h3>Informações Pessoais</h3>

                    <div className="img">
                        <img src="/assets/account.svg" alt="Ícone de perfil de conta" />
                    </div>

                    {usuario ? (
                    
                    <>
                        <div className="perfil-campo">
                            <div className="perfil-campo-header">
                                <label>Nome Completo</label>
                                <button className="editar-btn">Editar</button>
                            </div>
                            <p>{usuario.nome}</p>
                        </div>

                        <div className="perfil-campo">
                            <div className="perfil-campo-header">
                                <label>Email</label>
                                <button className="editar-btn">Editar</button>
                            </div>
                            <p>{usuario.email}</p>
                        </div>

                        <div className="perfil-campo">
                            <div className="perfil-campo-header">
                                <label>CPF</label>
                                <button className="editar-btn">Editar</button>
                            </div>
                            <p>{usuario.cpf}</p>
                        </div>
                    </>
                    
                    ) : (
                        <h3>Carregando informações do usuário...</h3>
                    )}
                
                </div>

                <div className="perfil-botoes">
                    <button className="btn-salvar">Salvar Alterações</button>
                    <button className="btn-excluir">Excluir Conta</button>
                </div>
            </main>

            <footer className="admin-footer">
                <p>Contato</p>
                <p>Termos de uso</p>
                <p>Política de privacidade</p>
            </footer>
        </div>
    )
}

export default PacientePerfil
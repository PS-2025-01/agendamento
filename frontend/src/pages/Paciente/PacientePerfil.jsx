import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {api} from "../../api";
import { useNavigate } from "react-router-dom";

const PacientePerfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [modalExcluir, setModalExcluir] = useState(false);
    const navigate = useNavigate();

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

    const excluir = async () => {
        await api.delete(`/api/auth/${usuario.id}`);
        setModalExcluir(false);
        navigate("/");
    }

    return (
        <>
        <Header />
        
        <div className="admin-container">
            <main className="main-content">
                <h2 className="perfil-msg"> Perfil </h2>
            
                <div className="perfil-coluna">
                    <h3>Informações Pessoais</h3>

                    <div className="img">
                        <img src="/assets/account.svg" alt="Ícone de perfil de conta" />
                    </div>

                    {modalExcluir && (
                        <div className="modal-overlay">
                            <div style={{backgroundColor: "#fff", padding: "1.5rem 2rem", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h1>Deseja excluir sua conta?</h1>
                                <div style={{display: "flex", gap: 16, alignSelf: "end" }}>
                                    <button style={{ border: "none", padding: "0.75rem 1rem", borderRadius: 8, backgroundColor: "#F41520", color: "white" }} onClick={excluir}>Confirmar</button>
                                    <button style={{ border: "none", padding: "0.75rem 1rem", borderRadius: 8 }} onClick={() => setModalExcluir(false)}>Cancelar</button>                        
                                </div>
                            </div>
                        </div>
                    )}

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
                    <button className="btn-excluir" onClick={() => setModalExcluir(true)}>Excluir Conta</button>
                </div>
            </main>

            <Footer />
        </div>
        </>
    )
}

export default PacientePerfil
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { Header } from "../../components/Header";
import { useMedicos } from "../../hooks/medicos";

const AdminHome = () => {
    const [usuario, setUsuario] = useState();
    const { medicos } = useMedicos();
    
    function sendName(nome, especialidade) {
        localStorage.setItem('doctor', JSON.stringify([nome, especialidade]));
        window.location.href = "/admin/medicos/horarios";
    }

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

    if (!usuario) return <h3>Carregando...</h3>;

    return (
        <div className="admin-container">
            <Header />

            <main className="admin-home">
                <h2>
                    Olá, {usuario.nome}, o que deseja fazer hoje?
                </h2>
                <div className="admin-buttons">
                    <a href="/admin/medicos">
                        <img src="/assets/clinic.svg" alt="Símbolo da saúde" />
                        Médicos
                    </a>
                    <a href="/admin/medicos">
                        <img src="/assets/time.svg" alt="Relógio" />
                        Horários
                    </a>
                </div>

                <div className="admin-medicos">
                    <h3>Médicos cadastrados</h3>
                    {medicos.map(medico => (
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info">
                            <p>{medico.nome}</p>
                            <p>{medico.especialidade}</p>
                        </div>
                        <button className="infoBtn" onClick={() => sendName(medico.nome, medico.especialidade)}>Vizualizar</button>
                    </div>
                    ))}
                </div>
            </main>

            <footer className="admin-footer">
               <p>© 2025 MediAgenda</p>
        <p>Contato: contato@mediagenda.com</p>
    <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    )
}

export default AdminHome
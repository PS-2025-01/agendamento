import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { Header } from "../../components/Header";

const AdminHome = () => {
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
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info">
                            <p>Dr. João Souza</p>
                            <p>15 de Abril de 2024</p>
                        </div>
                        <a href="/admin/medicos/horarios">Vizualizar</a>
                    </div>
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info">
                            <p>Dr. Valeria Silva</p>
                            <p>12 de Abril de 2024</p>
                        </div>
                        <a href="/admin/medicos/horarios">Vizualizar</a>
                    </div>
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info">
                            <p>Dr. Valeria Silva</p>
                            <p>12 de Abril de 2024</p>
                        </div>
                        <a href="/admin/medicos/horarios">Vizualizar</a>
                    </div>
                </div>
            </main>

            <footer className="admin-footer">
                <p>Contato</p>
                <p>Termos de uso</p>
                <p>Política de privacidade</p>
                <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>
            </footer>
        </div>
    )
}

export default AdminHome
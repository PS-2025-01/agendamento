import "./styles.css";
import { useMedicos } from "../../hooks/medicos";
import { useState } from "react";
import { Header } from "../../components/Header";

const AdminMedicos = () => {
    const [filter, setFilter] = useState("");
    const { medicos } = useMedicos();
    
    const filtrados =  filter === "" ? medicos : medicos.filter(medico => medico.nome.toLowerCase().includes(filter.toLowerCase()) || medico.especialidade.toLowerCase().includes(filter.toLowerCase()));

    function sendName(nome, especialidade) {
        localStorage.setItem('doctor', JSON.stringify([nome, especialidade]));
        window.location.href = "/admin/medicos/horarios";
    }

    return (
        <div className="admin-container">
            <Header />

            <main>
                <h2>
                    Médicos
                </h2>
                <div className="admin-medicos">
                    <div className="input-wrapper">
                        <label htmlFor="search">
                            <img src="/assets/search.svg" alt="Ícone de pesquisa" />
                        </label>
                        <input type="text" name="search" placeholder="Busca por nome ou especialidade" onChange={e => setFilter(e.target.value)} value={filter} />
                    </div>
                    {filtrados.map((medico) => (
                    <div className="admin-medico-wrapper" key={medico.id}>
                        <div className="admin-medico-info-wrapper">
                            <img className="admin-img" src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>{medico.nome}</p>
                                <p>{medico.especialidade}</p>
                            </div>
                        </div>
                        <button className="infoBtn" onClick={() => sendName(medico.nome, medico.especialidade)}>Informações</button>
                    </div> ))}
                </div>
                <a className="register-btn" href="/admin/medicos/cadastro">Cadastrar novo médico</a>
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

export default AdminMedicos
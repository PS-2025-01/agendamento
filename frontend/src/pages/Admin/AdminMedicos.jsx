import "./styles.css";

const AdminMedicos = () => {
    const medicos = [
        { id: 1, nome: "Dr. João Souza", especialidade: "Cardiologista" },
        { id: 2, nome: "Dra. Maria Lima", especialidade: "Dermatologista" },
        { id: 3, nome: "Dr. Carlos Alves", especialidade: "Ortopedista" },
        { id: 4, nome: "Dra. Valeria Silva", especialidade: "Clinico Geral" },
        { id: 5, nome: "Dr. Rodrigo Ferreira", especialidade: "Neurologista" },
    ];

    return (
        <div className="admin-container">
            <header>
                <h3>MediAgenda</h3>
                <nav>
                    <ul>
                        <li>
                            <a href="/admin/home">Home</a>
                        </li>
                        <li>
                            <a href="/admin/medicos">Médicos</a>
                        </li>
                        <li>
                            <a href="/admin/perfil">Perfil</a>
                        </li>
                        <li>
                            <a href="/logout">Sair</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <h2>
                    Médicos
                </h2>
                <div className="admin-medicos">
                    <div className="input-wrapper">
                        <label htmlFor="search">
                            <img src="/assets/search.svg" alt="Ícone de pesquisa" />
                        </label>
                        <input type="text" name="search" placeholder="Busca por nome ou especialidade" />
                    </div>
                    {medicos.map((medicos) => (
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info-wrapper">
                            <img className="admin-img" src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>{medicos.nome}</p>
                                <p>{medicos.especialidade}</p>
                            </div>
                        </div>
                        <a href="/admin/medicos/horarios">Informações</a>
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
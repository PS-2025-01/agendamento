import "./styles.css";

const AdminMedicos = () => {
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
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info-wrapper">
                            <img src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>Dr. João Souza</p>
                                <p>Cardiologista</p>
                            </div>
                        </div>
                        <button>Informações</button>
                    </div>
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info-wrapper">
                            <img src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>Dra. Maria Lima</p>
                                <p>Dermatologista</p>
                            </div>
                        </div>
                        <button>Informações</button>
                    </div>
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info-wrapper">
                            <img src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>Dr. Carlos Alves</p>
                                <p>Ortopedista</p>
                            </div>
                        </div>
                        <button>Informações</button>
                    </div>
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info-wrapper">
                            <img src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>Dra. Valeria Silva</p>
                                <p>Clinico Geral</p>
                            </div>
                        </div>
                        <button>Informações</button>
                    </div>
                    <div className="admin-medico-wrapper">
                        <div className="admin-medico-info-wrapper">
                            <img src="/assets/doctor.png" alt="Ícone de perfil do médico" />
                            <div className="admin-medico-info">
                                <p>Dr. Rodrigo Ferreira</p>
                                <p>Neurologista</p>
                            </div>
                        </div>
                        <button>Informações</button>
                    </div>
                </div>
            </main>

            <footer class="admin-footer">
                <p>Contato</p>
                <p>Termos de uso</p>
                <p>Política de privacidade</p>
            </footer>
        </div>
    )
}

export default AdminMedicos
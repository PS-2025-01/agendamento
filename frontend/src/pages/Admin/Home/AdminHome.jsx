import "./styles.css";

const AdminHome = () => {
    return (
        <div className="admin-container">
            <header>
                <h3>MediAgenda</h3>
                <nav>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Médicos</a>
                        </li>
                        <li>
                            <a href="#">Horários</a>
                        </li>
                        <li>
                            <a href="#">Perfil</a>
                        </li>
                        <li>
                            <a href="#">Sair</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <h2>
                    O que deseja fazer hoje?
                </h2>
                <div className="admin-buttons">
                    <a href="#">
                        <img src="/assets/clinic.svg" alt="Símbolo da saúde" />
                        Médicos
                    </a>
                    <a href="#">
                        <img src="/assets/time.svg" alt="Relógio" />
                        Horários
                    </a>
                </div>

                <div className="medicos">
                    <h3>Médicos cadastrados</h3>
                    <div className="medico-wrapper">
                        <div className="medico-info">
                            <p>Dr. João Souza</p>
                            <p>15 de Abril de 2024</p>
                        </div>
                        <button>Vizualizar</button>
                    </div>
                    <div className="medico-wrapper">
                        <div className="medico-info">
                            <p>Dr. Valeria Silva</p>
                            <p>12 de Abril de 2024</p>
                        </div>
                        <button>Vizualizar</button>
                    </div>
                </div>
            </main>

            <footer>
                <p>Contato</p>
                <p>Termos de uso</p>
                <p>Política de privacidade</p>
            </footer>
        </div>
    )
}

export default AdminHome
import "./styles.css";

const AdminPerfil = () => {
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

            <main className="main-content">
                <h2 className="perfil-msg"> Perfil </h2>
            
                <div className="perfil-coluna">
                    <h3>Informações Pessoais</h3>

                    <div className="img">
                        <img src="/assets/account.svg" alt="Ícone de perfil de conta" />
                    </div>

                    <div className="perfil-campo">
                        <div className="perfil-campo-header">
                            <label>Nome Completo</label>
                            <button className="editar-btn">Editar</button>
                        </div>
                        <p>Dr. João Souza</p>
                    </div>

                    <div className="perfil-campo">
                        <div className="perfil-campo-header">
                            <label>Email</label>
                            <button className="editar-btn">Editar</button>
                        </div>
                        <p>joao.souza@mediagenda.com</p>
                    </div>

                    <div className="perfil-campo">
                        <div className="perfil-campo-header">
                            <label>Telefone</label>
                            <button className="editar-btn">Editar</button>
                        </div>
                        <p>(21) 99999-9999</p>
                    </div>

                    <div className="perfil-campo">
                        <div className="perfil-campo-header">
                            <label>Data de Nascimento</label>
                            <button className="editar-btn">Editar</button>
                        </div>
                        <p>15/03/1985</p>
                    </div>

                    <div className="perfil-campo">
                        <div className="perfil-campo-header">
                            <label>CPF</label>
                            <button className="editar-btn">Editar</button>
                        </div>
                        <p>123.456.789-00</p>
                    </div>
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

export default AdminPerfil
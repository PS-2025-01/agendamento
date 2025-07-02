export const Header = () => {
    return (
        <header>
            <div className="logo">MediAgenda</div>
            <nav>
            <a href="#medicos" className="active">
                Médicos
            </a>
            <a href="/paciente/home">Home</a>
            <a href="/paciente/horarios">Horários</a>
            <a href="/paciente/perfil">Perfil</a>
            <a href="/logout">Sair</a>
            </nav>
      </header>
    )
}
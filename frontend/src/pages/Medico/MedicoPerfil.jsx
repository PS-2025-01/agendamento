import "./styles.css";

const MedicoPerfil = () => {
  const consultas = [
    { id: 1, nome: "Mariana Souza" },
    { id: 2, nome: "João Pereira" },
    { id: 3, nome: "Ana Souza" },
    { id: 4, nome: "Carlos Alberto" },
    { id: 5, nome: "Joana Medeiros" },
    { id: 6, nome: "Isabela Silva" },

  ];

  return ( 
    <div className="medico-container">
      <header className="header">
       <h3>MediAgenda</h3>
        <nav>
          <ul>
            <li><a href="/medico/home">Home</a></li>
            <li><a href="/agenda">Agenda</a></li>
            <li><a href="/perfil">Perfil</a></li>
            <li><a href="/logout">Sair</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="perfil-msg"> Perfil </h2>
       
     <div className="perfil-container">
  <div className="perfil-coluna">
    <h3>Informações Pessoais</h3>

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

  <div className="perfil-coluna">
    <h3>Endereço de Atendimento</h3>

    <div className="perfil-campo">
      <div className="perfil-campo-header">
        <label>CEP</label>
        <button className="editar-btn">Editar</button>
      </div>
      <p>20000-000</p>
    </div>

    <div className="perfil-campo">
      <div className="perfil-campo-header">
        <label>Bairro</label>
        <button className="editar-btn">Editar</button>
      </div>
      <p>Centro</p>
    </div>

    <div className="perfil-campo">
      <div className="perfil-campo-header">
        <label>Rua</label>
        <button className="editar-btn">Editar</button>
      </div>
      <p>Rua das Flores</p>
    </div>

    <div className="perfil-campo">
      <div className="perfil-campo-header">
        <label>Número</label>
        <button className="editar-btn">Editar</button>
      </div>
      <p>463</p>
    </div>

    <div className="perfil-campo">
      <div className="perfil-campo-header">
        <label>Cidade</label>
        <button className="editar-btn">Editar</button>
      </div>
      <p>Rio de Janeiro</p>
    </div>
  </div>
</div>

<div className="perfil-botoes">
  <button className="btn-salvar">Salvar Alterações</button>
  <button className="btn-excluir">Excluir Conta</button>
</div>


<footer-medico>
    <div>© 2025 MediAgenda</div>
    <div>Contato: contato@mediagenda.com</div>
</footer-medico>
   
</main>

     </div>
  );
}

export default MedicoPerfil;
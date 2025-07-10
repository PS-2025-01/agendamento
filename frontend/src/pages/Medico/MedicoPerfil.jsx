import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { useUsuarios } from "../../hooks/usuarios";
import { useMedicos } from "../../hooks/medicos";
import { Header } from "../../components/Header";

const MedicoPerfil = () => {
    const [filter, setFilter] = useState("");
    const [usuario, setUsuario] = useState(null);
    const { usuarios } = useUsuarios();
    const { medicos } = useMedicos();

    const filtrados =  filter === "" ? medicos : medicos.filter(medico => medico.nome.toLowerCase().includes(filter.toLowerCase()) || medico.especialidade.toLowerCase().includes(filter.toLowerCase()));

    let especialidade;

    const encontrado = filtrados.find(medico => medico.nome === usuarios.nome);
    if (encontrado) {
        especialidade = encontrado.especialidade;
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

  return ( 
    <div className="medico-container">
      <Header />

      <main className="main-content">
        <h2 className="perfil-msg"> Perfil </h2>
       
     <div className="perfil-container">
  <div className="perfil-coluna">
    <h3>Informações Pessoais</h3>

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

          {/* <div className="perfil-campo">
              <div className="perfil-campo-header">
                  <label>CPF</label>
                  <button className="editar-btn">Editar</button>
              </div>
              <p>{usuario.cpf}</p>
          </div> */}

          <div className="perfil-campo">
              <div className="perfil-campo-header">
                  <label>Especialidade</label>
                  <button className="editar-btn">Editar</button>
              </div>
              <p>{especialidade}</p>
          </div>
      </>
      
      ) : (
          <h3>Carregando informações do usuário...</h3>
      )}
  </div>
</div>

<div className="perfil-botoes">
  <button className="btn-salvar">Salvar Alterações</button>
  <button className="btn-excluir">Excluir Conta</button>
</div>


<footer>
    <p>© 2025 MediAgenda</p>
        <p>Contato: contato@mediagenda.com</p>
    <p>Endereço: Rua Augusta, 563, Lapa - RJ - 05678-263</p>

</footer>

   </main>

     </div>
  );
}

export default MedicoPerfil;
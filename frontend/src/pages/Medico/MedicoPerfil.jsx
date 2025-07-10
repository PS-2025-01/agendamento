import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { useUsuarios } from "../../hooks/usuarios";
import { useMedicos } from "../../hooks/medicos";
import { Header } from "../../components/Header";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const MedicoPerfil = () => {
    const [filter, setFilter] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [modalExcluir, setModalExcluir] = useState(false);
    const navigate = useNavigate();
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

    const excluir = async () => {
        await api.delete(`/api/auth/${usuario.id}`);
        setModalExcluir(false);
        navigate("/");
    }

  return ( 
    <div className="medico-container">
      <Header />

      <main className="main-content">
        <h2 className="perfil-msg"> Perfil </h2>
       
     <div className="perfil-container">
        <div className="perfil-coluna">
        <h3>Informações Pessoais</h3>
        {modalExcluir && (
            <div className="modal-overlay">
                <div style={{backgroundColor: "#fff", padding: "1.5rem 2rem", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h1>Deseja excluir sua conta?</h1>
                    <div style={{display: "flex", gap: 16, alignSelf: "end" }}>
                        <button style={{ border: "none", padding: "0.75rem 1rem", borderRadius: 8, backgroundColor: "#F41520", color: "white" }} onClick={excluir}>Confirmar</button>
                        <button style={{ border: "none", padding: "0.75rem 1rem", borderRadius: 8 }} onClick={() => setModalExcluir(false)}>Cancelar</button>                        
                    </div>
                </div>
            </div>
        )}
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
  <button className="btn-excluir" onClick={() => setModalExcluir(true)}>Excluir Conta</button>
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
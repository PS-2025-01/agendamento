import { Header } from "../../components/Header";
import "./styles.css";
import { useGrades } from "../../hooks/grades";
import { CadastroGrade } from "../../components/grade/CadastroGrade";
import { useState } from "react";
import { api } from "../../api";

const dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export const GradePage = () => {
    const { grades, fetch } = useGrades();
    const [isOpen, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);

    const handleDelete = async (id) => {
        await api.delete(`/api/grades/${id}`);
        await fetch();
    }

    return (
        <div className="medico-container">
            <Header />

            <main className="main-content">            
                <CadastroGrade isOpen={isOpen} setOpen={setOpen} edit={edit} fetch={fetch} />
                <div style={{display: "flex", flexDirection: "column", alignItems:"end", width: "100%", maxWidth: 720}}>
                    <h1 style={{alignSelf: "start"}}>Grades</h1>
                    <div>
                        <button
                            style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, marginTop: 6}}
                            onClick={() => setOpen(true)}
                        >Cadastrar nova grade</button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Dia da semana</th>
                            <th>Inicio</th>
                            <th>Fim</th>
                            <th>Intervalo</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                {
                    grades.map((grade, index) => (
                        <tr key={index}>
                            <td>{dias[grade.dia]}</td>
                            <td>{grade.inicio.slice(0,5)}</td>
                            <td>{grade.fim.slice(0,5)}</td>
                            <td>{grade.intervalo}</td>
                            <td>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
                                    <button 
                                    style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, marginTop: 6}}
                                    onClick={() => {
                                        setOpen(true)
                                        setEdit(grade)
                                    }}
                                >Editar</button>
                                    <button 
                                        style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, marginTop: 6}}
                                        onClick={() => handleDelete(grade.id)}
                                    >Excluir</button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
                </div>
            </main>
        </div>
    )
}

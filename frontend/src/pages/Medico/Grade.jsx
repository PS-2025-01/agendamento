import { Header } from "../../components/Header";
import "./styles.css";
import { useGrades } from "../../hooks/grades";
import { CadastroGrade } from "../../components/grade/CadastroGrade";

const dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export const GradePage = () => {
    const grades = useGrades();
    
    return (
        <div className="medico-container">
            <Header />

            <main className="main-content">
                <CadastroGrade />
                <div style={{display: "flex", gap: 32, width: "100%", maxWidth: 720}}>
                {
                    grades.map((grade, index) => (
                        <div key={index} style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                            <p style={{ fontWeight: 600 }}>{dias[grade.dia]}</p>
                            <p style={{ marginTop: 8, lineHeight: 0.75, fontSize: "1.15rem"}}>{grade.inicio.slice(0, 5)} - {grade.fim.slice(0, 5)}</p>
                            <p>intervalo: {grade.intervalo}</p>
                        </div>
                    ))
                }
                </div>
            </main>
        </div>
    )
}
import { useState } from "react";
import { api } from "../../api";

const dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export const CadastroGrade = () => {
    const [dia, setDia] = useState(0);
    const [inicio, setInicio] = useState("08:30");    
    const [fim, setFim] = useState("18:00");
    const [intervalo, SetIntervalo] = useState(30);

    const handleSubmit = async () => {
        await api.post("/api/grades", {
            dia,
            inicio,
            fim,
            intervalo 
        });
        window.location.reload(); 
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems:"stretch", gap: 12}}>
            <div style={{display: "flex", gap: 12}}>
                {dias.map((label, index) => (<button style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, backgroundColor: dia === index && "rgb(122, 153, 236)"}} key={index} onClick={() => setDia(index)}>{label}</button>))}
            </div>

            <div style={{display: "flex", gap: 12, alignItems: "center", justifyContent: "center"}}>
                <input type="text" value={inicio} onChange={(e) => setInicio(e.target.value)}
                    style={{padding: 4, borderRadius: 4, border: "1px solid rgb(158, 158, 158)", width: "auto"}}
                />
                <input type="text" value={fim} onChange={(e) => setFim(e.target.value)}
                    style={{padding: 4, borderRadius: 4, border: "1px solid rgb(158, 158, 158)"}}
                />
                <input type="text" value={intervalo} onChange={(e) => SetIntervalo(Number(e.target.value))}
                    style={{padding: 4, borderRadius: 4, border: "1px solid rgb(158, 158, 158)"}}
                />            
            </div>

            <button 
                onClick={handleSubmit}
                style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, marginTop: 6}
            }>Cadastrar</button>
        </div>
    );
}
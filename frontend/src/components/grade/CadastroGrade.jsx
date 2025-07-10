import { useEffect, useState } from "react";
import { api } from "../../api";

const dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export const CadastroGrade = ({ isOpen, setOpen, edit, fetch }) => {
    const [dia, setDia] = useState(0);
    const [inicio, setInicio] = useState("08:30");    
    const [fim, setFim] = useState("18:00");
    const [intervalo, SetIntervalo] = useState(30);

    useEffect(() => {
        if (edit) {
            setDia(edit.dia);
            setInicio(edit.inicio.slice(0, 5));
            setFim(edit.fim.slice(0, 5));
            SetIntervalo(edit.intervalo);
        } else {
            setDia(0);
            setInicio("08:30");
            setFim("18:00");
            setInterval(30);
        }
    }, [edit])
    const handleSubmit = async () => {
        if (edit?.id) {
            await api.patch("/api/grades/" + edit.id, {
                dia,
                inicio,
                fim,
                intervalo
            });
        } else {
            await api.post("/api/grades", {
                dia,
                inicio,
                fim,
                intervalo
            })
        }
        await fetch();
        setOpen(false);
    }

    if (!isOpen) return <></>;

    return (
        <div className="modal-overlay">
            <div style={{backgroundColor: "#fff", padding: "1.5rem 2rem", borderRadius: 8 }}>
        <div style={{display: "flex", flexDirection: "column", alignItems:"stretch", gap: 12}}>
            
                <div style={{display: "flex", gap: 12}}>
                    {dias.map((label, index) => (<button style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, backgroundColor: dia === index && "rgb(122, 153, 236)"}} key={index} onClick={() => setDia(index)}>{label}</button>))}
                </div>

                <div style={{display: "flex", gap: 12, alignItems: "center", justifyContent: "center", marginTop: 8}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "start", gap: 4}}>
                        <label style={{ fontSize: "1.2rem"}}>Inicio</label>
                        <input type="text" value={inicio} onChange={(e) => setInicio(e.target.value)}
                            style={{padding: 4, borderRadius: 4, border: "1px solid rgb(158, 158, 158)", width: "auto"}}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "start", gap: 4}}>
                        <label style={{ fontSize: "1.2rem"}}>Fim</label>
                        <input type="text" value={fim} onChange={(e) => setFim(e.target.value)}
                            style={{padding: 4, borderRadius: 4, border: "1px solid rgb(158, 158, 158)"}}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "start", gap: 4}}>
                        <label style={{ fontSize: "1.2rem"}}>Intervalo</label>
                        <input type="text" value={intervalo} onChange={(e) => SetIntervalo(Number(e.target.value))}
                            style={{padding: 4, borderRadius: 4, border: "1px solid rgb(158, 158, 158)"}}
                        />
                    </div>   
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 16}}>
                    <button 
                        onClick={handleSubmit}
                        style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, marginTop: 6}
                    }>Salvar</button>
                    <button 
                        onClick={() => setOpen(false)}
                        style={{border: "none", padding: "4px 8px", width:"100%", borderRadius: 4, marginTop: 6}
                    }>Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    );
}
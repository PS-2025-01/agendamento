import { useEffect, useState } from "react"
import { api } from "../api";

export const useGrades = (medico) => {
    const [grades, setGrades] = useState([]);

    const fetch = async () => {
        const load = async (medicoId) => {
            const response = await api.get(`/api/grades?medicoId=${medicoId}`);
            
            if (response.status === 200) {
                setGrades(response.data);
            }
        }
        
        const loadMedico = async () => {
            const response = await api.get('/api/medicos/current');
            await load(response.data.id);
        }
        if (medico) {
            await load(medico.id);
        } else {
            await loadMedico();
        }
    }

    useEffect(() => {
        fetch();
    }, [medico]);

    return { grades, fetch };
}
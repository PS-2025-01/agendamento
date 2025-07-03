import { useEffect, useState } from "react"
import { api } from "../api";

export const useGrades = (medico) => {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
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
            load(medico.id);
        } else {
            loadMedico();
        }

    }, [medico]);

    return grades;
}
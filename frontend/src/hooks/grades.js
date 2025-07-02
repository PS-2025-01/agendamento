import { useEffect, useState } from "react"
import { api } from "../api";

export const useGrades = (medico) => {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const load = async () => {
            const response = await api.get(`/api/grades?medicoId=${medico.id}`);
            
            if (response.status === 200) {
                setGrades(response.data);
            }
        }

        if (medico) {
            load();
        }
    }, [medico]);

    return grades;
}
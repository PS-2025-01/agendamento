import { useEffect, useState } from "react"
import { api } from "../api";

export const useHorarios = (medico, data) => {
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        const load = async () => {
            let resource = `/api/grades/horarios?medicoId=${medico.id}&data=${data}`;
            const response = await api.get(resource);

            if (response.status === 200) {
                setHorarios(response.data);
            }
        }
        
        if (medico && data) {
            load();
        }
    }, [medico, data]);

    return horarios;
}
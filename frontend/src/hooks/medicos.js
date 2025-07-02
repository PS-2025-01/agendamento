import { useEffect, useState } from "react"
import { api } from "../api";

export const useMedicos = () => {
    const [loading, setLoading] = useState(true);
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        const load = async () => {
            let resource = "/api/medicos";

            const response = await api.get(resource);

            if (response.status === 200) {
                setMedicos(response.data);
            }

            setLoading(false);
        }

        load();
    }, []);


    return {medicos, loading};
}
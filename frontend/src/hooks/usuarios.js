import { useEffect, useState } from "react"
import { api } from "../api";

export const useUsuarios = () => {
    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const load = async () => {
            let resource = "/api/auth/current";

            const response = await api.get(resource);

            if (response.status === 200) {
                setUsuarios(response.data);
            }

            setLoading(false);
        }

        load();
    }, []);


    return {usuarios, loading};
}
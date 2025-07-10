import { useEffect, useState } from "react"
import { api } from "../api";

export const useAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const fetch = async () => {
        const response = await api.get("/api/agendamentos");

        if (response.status === 200) {
            setAgendamentos(response.data);
        }
    }

    useEffect(() => {
        fetch();
    }, []);


    return { agendamentos, fetch };
}
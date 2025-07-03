import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const [acesso, setAcesso] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear("token");
        localStorage.clear("acesso");
        navigate("/");
    }

    useEffect(() => {
        const load = () => {
            setAcesso(localStorage.getItem("acesso"));
        }

        load()
    }, [])
    if (acesso === "") return <></>;
    
    const links = routes[acesso].map(({link, label}) => (<a href={link} key={link}>{label}</a>));

    return (
        <header>
            <div className="logo">MediAgenda</div>
            <nav>
            {links}
            <a onClick={handleLogout}>Sair</a>
            </nav>
      </header>
    )
}

const routes = {
    "admin": [
        {
            link: "/admin/home",
            label: "Home"
        },
        {
            link: "/admin/medicos",
            label: "Médicos"
        },
        {
            link: "/admin/perfil",
            label: "Perfil"
        }
    ],
    "medico": [
        {
            link: "/medico/home",
            label: "Home"
        },
        {
            link: "/medico/agenda",
            label: "Agenda"
        },
        {
            link: "/medico/perfil",
            label: "Perfil"
        }
    ],
    "paciente": [
        {
            link: "/paciente/home",
            label: "Home"
        },
        {
            link: "/paciente/perfil",
            label: "Perfil"
        }
    ]
}
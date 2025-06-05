import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import MedicoRoutes from "./MedicoRoutes";
import PacienteRoutes from "./PacienteRoutes";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
            <MedicoRoutes />
            <PacienteRoutes />
        </Router>
    );
}

export default AppRoutes;
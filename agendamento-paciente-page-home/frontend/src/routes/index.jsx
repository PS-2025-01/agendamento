import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/Signup/Signup";
import MedicoRoutes from "./MedicoRoutes";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
            <MedicoRoutes />
        </Router>
    );
}

export default AppRoutes;
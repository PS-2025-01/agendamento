import React from "react";
import Login from "../pages/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
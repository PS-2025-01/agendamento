import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AdminRoutes from "./AdminRoutes";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>

            <AdminRoutes />
        </Router>
    );
}

export default AppRoutes;
import React from "react";
import Login from "../pages/login/Login";
import Signup from "../pages/Signup/Signup";
import HomeMed from "../pages/medico/HomeMed";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/home-med" element={<HomeMed />}></Route>
                
            </Routes>
        </Router>
    );
}

export default AppRoutes;
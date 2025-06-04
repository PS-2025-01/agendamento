import React from "react";
import Login from "../pages/login/Login";
import Signup from "../pages/Signup/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
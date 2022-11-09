import React from "react";
import { Routes, Route } from "react-router-dom"

import Dashboard from '../components/Pages/Dashboard/Dashboard'
import Orders from '../components/Pages/Orders'
import NotFound from '../components/Error/NotFound'

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Dashboard /> } />
            <Route path="dashboard" element={<Dashboard /> } />
            <Route path="orders" element={<Orders /> } />
            <Route path="/*" element={<NotFound /> } />
        </Routes>
    )
}

export default Router
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth }) => {
    return auth ? <Outlet /> : <Navigate to="/app/login" />;
}
export default PrivateRoute
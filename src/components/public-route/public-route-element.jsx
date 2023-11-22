import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRouteElement = () => {
    const token = useSelector(state => state.user.token);
    const resetPasswordAccess = useSelector(state => state.user.resetPasswordAccess);

    const location = useLocation();

    if (location.pathname === '/reset-password' && !resetPasswordAccess) {
        return <Navigate to="/forgot-password" />;
    }

    if (token) {
        return <Navigate to="/profile" />;
    }
    return <Outlet />;
}

export default PublicRouteElement 
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

const PublicRouteElement = () => {
    const token = useAppSelector(state => state.user.token);
    const resetPasswordAccess = useAppSelector(state => state.user.resetPasswordAccess);

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
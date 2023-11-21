import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { saveRedirectPath, checkAuthentication } from '../../services/actions/user';


const ProtectedRouteElement = () => {
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(checkAuthentication());
    }, [dispatch]);

    useEffect(() => {
        if (!token) {
            dispatch(saveRedirectPath(location.pathname));
        }
    }, [token, dispatch, location.pathname]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default ProtectedRouteElement 
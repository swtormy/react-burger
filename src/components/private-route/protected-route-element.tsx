import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { saveRedirectPath, checkAuthentication } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

type Props = {}

const ProtectedRouteElement: React.FC<Props> = ({ }) => {
    const token = useAppSelector(state => state.user.token);
    const dispatch = useAppDispatch();
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
import { logIn, refresh, register, logOut } from '../../utils/burger-api';

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN/SUCCESS';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN/FAIL';

export const LOGIN_SUCCESS = 'LOGIN/SUCCESS';
export const LOGIN_FAIL = 'LOGIN/FAIL';

export const REGISTER_SUCCESS = 'REGISTER/SUCCESS';
export const REGISTER_FAIL = 'REGISTER/FAIL';

export const LOGOUT_SUCCESS = 'LOGOUT/SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT/FAIL';

export const loginUser = (userData) => {
    return (dispatch) => {
        return logIn(userData).then(response => {
            if (response.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        user: response.user,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken
                    }
                });
            } else {
                dispatch({ type: REGISTER_FAIL, payload: response });
            }
        }).catch(error => {
            console.error(error)
        });
    };
};

export const refreshToken = (refreshToken) => {
    return (dispatch) => {
        return refresh(refreshToken).then(response => {
            if (response.success) {
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    payload: {
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken
                    }
                });
            } else {
                dispatch({ type: REFRESH_TOKEN_FAIL, payload: response });
            }
        }).catch(error => {
            console.log(error);
        });
    };
};

export const registerUser = (userData) => {
    return (dispatch) => {
        return register(userData).then(response => {
            if (response.success) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {
                        user: response.user,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken
                    }
                });
            } else {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: response
                });
            }
        })
            .catch(error => {
                console.error(error)
            });
    };
};

export const logoutUser = (refreshToken) => {
    return (dispatch) => {
        return logOut(refreshToken).then(response => {
            if (response.success) {
                dispatch({ type: LOGOUT_SUCCESS });
            } else {
                dispatch({ type: LOGOUT_FAIL, payload: response });
            }
        }).catch(error => {
            console.error(error)
        });
    };
};
import { logIn, refresh, register, logOut } from '../../utils/burger-api';
import Cookies from 'js-cookie';
import { checkTokenExpiry } from '../../utils/utils-funcs';
import { AllowResetPasswordAccessAction, AuthActionTypes, RefreshTokenSuccessAction, RegisterSuccessAction, SaveRedirectPathAction, TUserProfileData, User } from '../../utils/models';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootState } from '../store';

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN/SUCCESS';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN/FAIL';

export const LOGIN_SUCCESS = 'LOGIN/SUCCESS';
export const LOGIN_FAIL = 'LOGIN/FAIL';

export const REGISTER_SUCCESS = 'REGISTER/SUCCESS';
export const REGISTER_FAIL = 'REGISTER/FAIL';

export const LOGOUT_SUCCESS = 'LOGOUT/SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT/FAIL';

export const RESET_PASSWORD_ACCESS = 'RESET_PASSWORD/ACCESS';

export const SAVE_REDIRECT_PATH = 'SAVE_REDIRECT/PATH';


export const saveRedirectPath = (path: string): SaveRedirectPathAction => {
    return {
        type: SAVE_REDIRECT_PATH,
        payload: path
    };
};

export const allowResetPasswordAccess = (): AllowResetPasswordAccessAction => {
    return {
        type: RESET_PASSWORD_ACCESS
    };
};

export const loginUser = (userData: TUserProfileData): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
    return (dispatch) => {
        return logIn(userData).then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: response.user,
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken
                }
            });
        }).catch(error => {
            dispatch({ type: LOGOUT_SUCCESS, payload: error });
        });
    };
};

export const refreshToken = (refreshToken: string): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
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
            dispatch({ type: LOGOUT_SUCCESS });
        });
    };
};

export const registerUser = (userData: TUserProfileData): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
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

export const logoutUser = (refreshToken : string): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
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

export const checkAuthentication = ():ThunkAction<void, RootState, unknown, AuthActionTypes> => (dispatch) => {
    const accessToken = Cookies.get('accessToken') || "";
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null;
    const refToken = Cookies.get('refreshToken') || "";
    if (accessToken && checkTokenExpiry(accessToken)) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                user: user,
                accessToken: accessToken,
                refreshToken: refToken
            }
        });
    } else if (accessToken && refToken) {
        dispatch(refreshToken(refToken));
    } else {
        dispatch({ type: LOGOUT_SUCCESS });
    }
};
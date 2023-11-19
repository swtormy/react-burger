import Cookies from 'js-cookie';
import { REFRESH_TOKEN_SUCCESS, LOGOUT_SUCCESS } from '../actions/user';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case REFRESH_TOKEN_SUCCESS:
            Cookies.set('accessToken', action.payload.accessToken);
            Cookies.set('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.accessToken,
                isLoggedIn: true
            };
        case LOGOUT_SUCCESS:
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            return {
                ...state,
                user: null,
                token: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
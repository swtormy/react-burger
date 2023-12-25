import Cookies from 'js-cookie';
import { SAVE_REDIRECT_PATH, LOGIN_SUCCESS, RESET_PASSWORD_ACCESS, REFRESH_TOKEN_SUCCESS, LOGOUT_SUCCESS } from '../actions/user';
import { AuthActionTypes, UserStoreState } from '../../utils/models';


const initialState: UserStoreState = {
    user_info: Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null,
    token: Cookies.get('accessToken') ? Cookies.get('accessToken')! : null,
    resetPasswordAccess: false,
    redirectPath: null
};

export default function userReducer(state: UserStoreState = initialState, action: AuthActionTypes) {
    switch (action.type) {

        case SAVE_REDIRECT_PATH:
            return {
                ...state,
                redirectPath: action.payload
            };
        case LOGIN_SUCCESS:
            Cookies.set('user', JSON.stringify(action.payload.user));
            Cookies.set('accessToken', action.payload.accessToken.replace("Bearer ", ""));
            Cookies.set('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.accessToken,
            };
        case REFRESH_TOKEN_SUCCESS:
            Cookies.set('accessToken', action.payload.accessToken.replace("Bearer ", ""));
            Cookies.set('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.accessToken,
            };
        case RESET_PASSWORD_ACCESS:
            return {
                ...state,
                resetPasswordAccess: true
            };
        case LOGOUT_SUCCESS:
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
}
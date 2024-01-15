import Cookies from "js-cookie";

import userReducer from "./userReducer";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKEN_SUCCESS, RESET_PASSWORD_ACCESS, SAVE_REDIRECT_PATH } from "../actions/user";
import { AuthActionTypes } from "../../utils/models";


const initialState = {
    user_info: Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null,
    token: Cookies.get('accessToken') ? Cookies.get('accessToken')! : null,
    resetPasswordAccess: false,
    redirectPath: null
};

describe('userReducer', () => {


    it('User initialized', () => {
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        expect(userReducer(undefined, unknownAction as any)).toEqual(initialState);
    });

    it('Save redirect path', () => {

        const action: AuthActionTypes = {
            type: SAVE_REDIRECT_PATH,
            payload: '/path'
        };

        const newState = userReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            redirectPath: '/path'
        });
    });

    it('Login success', () => {

        const action: AuthActionTypes = {
            type: LOGIN_SUCCESS,
            payload: {
                user: {
                    email: "user@email.ru",
                    name: "Юзер Юзеровский"
                },
                accessToken: 'accessToken',
                refreshToken: 'refreshToken'
            }
        };

        const newState = userReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            user_info: action.payload.user,
            token: 'accessToken',
        });
    });

    it('Refresh token success', () => {

        const action: AuthActionTypes = {
            type: REFRESH_TOKEN_SUCCESS,
            payload: {
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken'
            }
        };

        const newState = userReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            user_info: undefined,
            token: 'newAccessToken',
        });
    });

    it('Reset password access', () => {

        const action: AuthActionTypes = {
            type: RESET_PASSWORD_ACCESS
        };

        const newState = userReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            resetPasswordAccess: true
        });
    });

    it('Logout success', () => {

        const action: AuthActionTypes = {
            type: LOGOUT_SUCCESS
        };

        const newState = userReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            user_info: null,
            token: null,
            resetPasswordAccess: false,
            redirectPath: null
        });
    });

});
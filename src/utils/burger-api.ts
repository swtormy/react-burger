import Cookies from 'js-cookie';
import { TErrorResponseData, TRequestOptions, TResponseData, TIngredientExtended, TUserProfileData } from './models';

const API_URL = 'https://norma.nomoreparties.space/api/';


const checkResponse = (res: Response): Promise<TResponseData> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: TResponseData): TResponseData => {
    if (res && res.success) {
        return res;
    }
    const errorResponse: TErrorResponseData = {
        success: false,
        message: `Ответ не success: ${JSON.stringify(res)}`
    };
    return errorResponse;
};

const request = (endpoint: string, options: TRequestOptions = {}): Promise<TResponseData> => {
    return fetch(`${API_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const getIngredients = (): Promise<TResponseData> => request("ingredients");

export const createOrder = (ingredientIds: TIngredientExtended[]): Promise<TResponseData> => request("orders", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        ingredients: ingredientIds,
    }),
});

export const resetPassword = (email: string): Promise<TResponseData> => request("password-reset", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email
    }),
});

export const submitNewPassword = (password: string, token: string): Promise<TResponseData> => request("password-reset/reset", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        password,
        token
    }),
});

export const fetchUserProfile = (): Promise<TResponseData> => {
    const token = Cookies.get('accessToken') || '';
    return request('auth/user', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
};

export const updateUserProfile = (userData: TUserProfileData): Promise<TResponseData> => {
    const token = Cookies.get('accessToken') || '';
    return request('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(userData)
    })
};


export const logIn = (userData: TUserProfileData): Promise<TResponseData> => request('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
})

export const logOut = (refreshToken: string): Promise<TResponseData> => request('auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
})

export const refresh = (refreshToken: string): Promise<TResponseData> => request('auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
})

export const register = (userData: TUserProfileData): Promise<TResponseData> => request('auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
})
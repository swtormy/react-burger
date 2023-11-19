import Cookies from 'js-cookie';

const API_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
    return fetch(`${API_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const getIngredients = () => request("ingredients");

export const createOrder = (ingredientIds) => request("orders", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        ingredients: ingredientIds,
    }),
});

export const resetPassword = (email) => request("password-reset", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email
    }),
});

export const submitNewPassword = (password, token) => request("password-reset/reset", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        password,
        token
    }),
});

export const fetchUserProfile = () => {
    const token = Cookies.get('accessToken');
    return request('auth/user', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
};

export const updateUserProfile = (userData) => {
    const token = Cookies.get('accessToken');
    return request('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(userData)
    })
};

export const logIn = (userData) => request('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
})

export const logOut = (refreshToken) => request('auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
})

export const refresh = (refreshToken) => request('auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
})

export const register = (userData) => request('auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
})
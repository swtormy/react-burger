import { getIngredients as fetchIngredients } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';

export const getIngredients = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });

        fetchIngredients()
            .then(data => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: data.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                    payload: error,
                });
                dispatch({
                    type: REMOVE_CURRENT_INGREDIENT,
                });
            });
    };
};

export const addCurrentIngredient = (ingredient) => {
    return {
        type: ADD_CURRENT_INGREDIENT,
        payload: ingredient,
    };
};

export const removeCurrentIngredient = () => {
    return {
        type: REMOVE_CURRENT_INGREDIENT,
    };
};
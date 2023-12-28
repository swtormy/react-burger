import { ThunkAction } from 'redux-thunk';
import { getIngredients as fetchIngredients } from '../../utils/burger-api';
import { RootState } from '../store';
import { AddCurrentIngredientAction, IngredientsActionTypes, RemoveCurrentIngredientAction, TIngredientExtended } from '../../utils/models';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';

export const getIngredients = (): ThunkAction<void, RootState, unknown, IngredientsActionTypes> => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });

        fetchIngredients()
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: res.data,
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

export const addCurrentIngredient = (ingredient: TIngredientExtended): AddCurrentIngredientAction => {
    localStorage.setItem("currentIngredient", JSON.stringify(ingredient))
    return {
        type: ADD_CURRENT_INGREDIENT,
        payload: ingredient,
    };
};

export const removeCurrentIngredient = (): RemoveCurrentIngredientAction => {
    return {
        type: REMOVE_CURRENT_INGREDIENT,
    };
};
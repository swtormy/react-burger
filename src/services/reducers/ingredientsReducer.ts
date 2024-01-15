import { IngredientsActionTypes, IngredientsState } from '../../utils/models';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    ADD_CURRENT_INGREDIENT,
    REMOVE_CURRENT_INGREDIENT
} from '../actions/ingredients';

const initialState: IngredientsState = {
    ingredientsList: [],
    currentIngredient: localStorage.getItem("currentIngredient") ? JSON.parse(localStorage.getItem("currentIngredient")!) : null,
    isLoading: false,
    error: null,
};

export default function ingredientsReducer(state: IngredientsState = initialState, action: IngredientsActionTypes) {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ingredientsList: action.payload,
            };
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case ADD_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload,
            };
        case REMOVE_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: null,
            };
        default:
            return state;
    }
}

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILURE,
    ADD_CURRENT_INGREDIENT,
    REMOVE_CURRENT_INGREDIENT
} from '../actions/ingredients';

const initialState = {
    ingredientsList: [],
    currentIngredient: null,
    isLoading: false,
    error: null,
};

export default function ingredientsReducer(state = initialState, action) {
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
        case GET_INGREDIENTS_FAILURE:
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

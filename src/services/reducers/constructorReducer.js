import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from '../actions/constructor'


const initialState = {
    constructorIngredients: [],
    totalPrice: 0
};

export default function constructorReducer(state = initialState, action) {
    
    switch (action.type) {

        case ADD_INGREDIENT:
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.payload],
                totalPrice: state.totalPrice + action.payload?.price,
            };
        case REMOVE_INGREDIENT:
            const newIngredientsList = state.constructorIngredients.filter(
                ingredient => ingredient._id !== action.payload._id
            );
            const newTotalPrice = newIngredientsList.reduce((total, ingredient) => total + ingredient.price, 0);
            return {
                ...state,
                constructorIngredients: newIngredientsList,
                totalPrice: newTotalPrice,
            };
        default:
            return state;
    }
}

import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    UPDATE_ORDER_INDEX
} from '../actions/constructor'


const initialState = {
    constructorIngredients: [],
    totalPrice: 0
};

export default function constructorReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_INGREDIENT: {
            let updatedConstructorIngredients = [...state.constructorIngredients];
            let updatedTotalPrice = state.totalPrice;

            if (action.payload.bun) {
                updatedConstructorIngredients = updatedConstructorIngredients.filter(ingredient => {
                    if (ingredient.type === 'bun') {
                        updatedTotalPrice -= ingredient.price;
                        return false;
                    }
                    return true;
                });
                updatedConstructorIngredients.push(...action.payload.bun);
                updatedTotalPrice += action.payload.bun[0].price * 2;
            } else {
                updatedConstructorIngredients.push(action.payload);
                updatedTotalPrice += action.payload.price;
            }

            updatedConstructorIngredients.sort((a, b) => a.orderIndex - b.orderIndex);

            return {
                ...state,
                constructorIngredients: updatedConstructorIngredients,
                totalPrice: updatedTotalPrice,
            };
        }
        case REMOVE_INGREDIENT:
            const newIngredientsList = state.constructorIngredients.filter(
                ingredient => ingredient.instanceId !== action.payload
            );
            const newTotalPrice = newIngredientsList.reduce((total, ingredient) => total + ingredient.price, 0);
            return {
                ...state,
                constructorIngredients: newIngredientsList,
                totalPrice: newTotalPrice,
            };
        case UPDATE_ORDER_INDEX: {
            const { oldIndex, newIndex } = action.payload;
            let updatedConstructorIngredients = [...state.constructorIngredients];
            const oldOrderIngredient = updatedConstructorIngredients.find(ingredient => ingredient.orderIndex === oldIndex);
            const newOrderIngredient = updatedConstructorIngredients.find(ingredient => ingredient.orderIndex === newIndex);

            if (oldOrderIngredient && newOrderIngredient) {
                oldOrderIngredient.orderIndex = newIndex;
                newOrderIngredient.orderIndex = oldIndex;
            }
            updatedConstructorIngredients.sort((a, b) => a.orderIndex - b.orderIndex);
            return {
                ...state,
                constructorIngredients: updatedConstructorIngredients
            };
        }
        default:
            return state;
    }
}

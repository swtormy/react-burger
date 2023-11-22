import {
    ADD_BUNS,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REMOVE_ALL_INGREDIENTS,
    UPDATE_ORDER_INDEX
} from '../actions/constructor'


const initialState = {
    constructorIngredients: []
};

export default function constructorReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_INGREDIENT: {
            const updatedConstructorIngredients = [...state.constructorIngredients];
            updatedConstructorIngredients.push(action.payload);
            return {
                ...state,
                constructorIngredients: updatedConstructorIngredients,
            };
        }
        case ADD_BUNS: {
            const updatedConstructorIngredients = state.constructorIngredients.filter(ingredient => ingredient.type !== "bun");
            return {
                ...state,
                constructorIngredients: updatedConstructorIngredients.concat(action.payload),
            };
        }

        case REMOVE_ALL_INGREDIENTS:
            return {
                ...state,
                constructorIngredients: []
            };
        case REMOVE_INGREDIENT:
            const newIngredientsList = state.constructorIngredients.filter(
                ingredient => ingredient.instanceId !== action.payload
            );
            return {
                ...state,
                constructorIngredients: newIngredientsList
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
            
            return {
                ...state,
                constructorIngredients: updatedConstructorIngredients.toSorted((a, b) => a.orderIndex - b.orderIndex)
            };
        }
        default:
            return state;
    }
}

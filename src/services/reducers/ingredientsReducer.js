const initialState = {
    ingredientsList: [],
    currentIngredient: {}
};

function ingredientsReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default ingredientsReducer;
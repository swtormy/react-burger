import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_BUNS = 'ADD_BUNS'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const REMOVE_ALL_INGREDIENTS = 'REMOVE/ALL_INGREDIENTS'
export const UPDATE_ORDER_INDEX = 'UPDATE_ORDER_INDEX'


export const addIngredient = (ingredient) => {
    const instanceId = uuidv4();
    return (dispatch, getState) => {
        const currentState = getState();
        const currentLength = currentState.burger_constructor.constructorIngredients?.length ?? 0;
        dispatch({
            type: ADD_INGREDIENT,
            payload: { ...ingredient, instanceId, orderIndex: currentLength },
        });
    };
};

export const addBuns = (ingredient) => ({
    type: ADD_BUNS,
    payload: [{ ...ingredient, instanceId: uuidv4() }, { ...ingredient, instanceId: uuidv4() }]
});

export const removeIngredient = (ingredient) => ({
    type: REMOVE_INGREDIENT,
    payload: ingredient,
});

export const removeAllIngredients = () => ({
    type: REMOVE_ALL_INGREDIENTS,
});

export const updateOrderIndex = (draggedIndex, hoverIndex) => {
    return {
        type: UPDATE_ORDER_INDEX,
        payload: {
            oldIndex: draggedIndex,
            newIndex: hoverIndex
        }
    };
};
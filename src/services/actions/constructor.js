import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const UPDATE_ORDER_INDEX = 'UPDATE_ORDER_INDEX'


export const addIngredient = (ingredient) => {
    const instanceId = uuidv4();
    return (dispatch, getState) => {
        const currentState = getState();
        const currentLength = currentState.burger_constructor.constructorIngredients?.length ?? 0;
        if (ingredient.type === 'bun') {
            const topBunInstanceId = uuidv4();
            const bottomBunInstanceId = uuidv4();
            dispatch({
                type: ADD_INGREDIENT,
                payload: {
                    bun: [
                        { ...ingredient, instanceId: topBunInstanceId, position: 'top' },
                        { ...ingredient, instanceId: bottomBunInstanceId, position: 'bottom' }
                    ]
                },
            });
        } else {
            dispatch({
                type: ADD_INGREDIENT,
                payload: { ...ingredient, instanceId, orderIndex: currentLength },
            });
        }
    };
};

export const removeIngredient = (ingredient) => ({
    type: REMOVE_INGREDIENT,
    payload: ingredient,
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
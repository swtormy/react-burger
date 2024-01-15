import { AddIngredientAction, RemoveIngredientAction, UpdateOrderIndexAction } from '../../utils/models';
import * as actions from '../actions/constructor';
import constructorReducer from './constructorReducer';
import { v4 as uuidv4 } from 'uuid';

const test_bun = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}

describe('constructorReducer', () => {
    const initialState = {
        constructorIngredients: []
    };

    it('Ingredients constructor initialized', () => {
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        expect(constructorReducer(undefined, unknownAction as any)).toEqual(initialState);
    });

    it('Adding an ingredient', () => {
        const ingredient = test_bun;
        const addIngredientAction: AddIngredientAction = {
            type: actions.ADD_INGREDIENT,
            payload: ingredient
        };
        const expectedState = {
            constructorIngredients: [ingredient]
        };
        expect(constructorReducer(initialState, addIngredientAction)).toEqual(expectedState);
    });

    it('Adding an buns', () => {
        const initialState = {
            constructorIngredients: []
        };

        const bun = test_bun;

        const addBunsAction = actions.addBuns(bun);

        const expectedState = {
            constructorIngredients: [
                { ...bun, instanceId: expect.any(String) },
                { ...bun, instanceId: expect.any(String) }
            ]
        };

        expect(constructorReducer(initialState, addBunsAction)).toEqual(expectedState);
    });

    it('Remove all ingredients', () => {
        const initialStateWithIngredients = {
            constructorIngredients: [
                test_bun,
                test_bun
            ]
        };

        const newState = constructorReducer(initialStateWithIngredients, actions.removeAllIngredients());
        expect(newState.constructorIngredients).toEqual([]);
    });

    it('Removing an ingredient', () => {
        const ingredient1 = { ...test_bun, instanceId: uuidv4() };
        const ingredient2 = { ...test_bun, instanceId: uuidv4() };
        const initialStateWithIngredients = {
            constructorIngredients: [ingredient1, ingredient2]
        };

        const removeIngredientAction: RemoveIngredientAction = {
            type: actions.REMOVE_INGREDIENT,
            payload: ingredient1.instanceId
        };

        const newState = constructorReducer(initialStateWithIngredients, removeIngredientAction);
        expect(newState.constructorIngredients).toEqual([ingredient2]);
        expect(newState.constructorIngredients).not.toContainEqual(ingredient1);
    });

    it('Updating order index of an ingredient', () => {
        const ingredient1 = { ...test_bun, instanceId: uuidv4(), orderIndex: 0 };
        const ingredient2 = { ...test_bun, instanceId: uuidv4(), orderIndex: 1 };
        const initialStateWithIngredients = {
            constructorIngredients: [ingredient1, ingredient2]
        };

        const updateOrderIndexAction: UpdateOrderIndexAction = {
            type: actions.UPDATE_ORDER_INDEX,
            payload: {
                oldIndex: ingredient1.orderIndex,
                newIndex: ingredient2.orderIndex
            }
        };

        const newState = constructorReducer(initialStateWithIngredients, updateOrderIndexAction);
        const updatedIngredient1 = newState.constructorIngredients.find(i => i.instanceId === ingredient1.instanceId);
        const updatedIngredient2 = newState.constructorIngredients.find(i => i.instanceId === ingredient2.instanceId);

        expect(updatedIngredient1).toBeDefined();
        expect(updatedIngredient2).toBeDefined();

        if (updatedIngredient1 && updatedIngredient2) {
            expect(updatedIngredient1.orderIndex).toEqual(1);
            expect(updatedIngredient2.orderIndex).toEqual(0);
        }
    });

});
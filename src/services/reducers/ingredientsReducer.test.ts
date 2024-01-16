import { IngredientsActionTypes } from "../../utils/models";
import { ADD_CURRENT_INGREDIENT, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, REMOVE_CURRENT_INGREDIENT } from "../actions/ingredients";
import ingredientsReducer from "./ingredientsReducer";

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

const initialState = {
    ingredientsList: [],
    currentIngredient: localStorage.getItem("currentIngredient") ? JSON.parse(localStorage.getItem("currentIngredient")!) : null,
    isLoading: false,
    error: null,
};

describe('ingredientsReducer', () => {
    

    it('Ingredients initialized', () => {
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        expect(ingredientsReducer(undefined, unknownAction as any)).toEqual(initialState);
    });

    it('Get ingredients request', () => {

        const action: IngredientsActionTypes = { type: GET_INGREDIENTS_REQUEST };
        const expectedState = {
            ...initialState,
            isLoading: true,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('Get ingredients success', () => {

        const ingredientsPayload = [
            test_bun
        ];

        const action: IngredientsActionTypes = { 
            type: GET_INGREDIENTS_SUCCESS,
            payload: ingredientsPayload
        };

        const expectedState = {
            ...initialState,
            isLoading: false,
            ingredientsList: ingredientsPayload,
            error: null
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('Get ingredients error', () => {

        const errorPayload = new Error('Failed to fetch ingredients');

        const action: IngredientsActionTypes = { 
            type: GET_INGREDIENTS_ERROR,
            payload: errorPayload
        };

        const expectedState = {
            ...initialState,
            isLoading: false,
            error: errorPayload
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('Add current ingredient', () => {
        const initialState = {
            ingredientsList: [],
            currentIngredient: null,
            isLoading: false,
            error: null,
        };

        const action: IngredientsActionTypes = { 
            type: ADD_CURRENT_INGREDIENT,
            payload: test_bun
        };

        const expectedState = {
            ...initialState,
            currentIngredient: test_bun,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('Remove current ingredient', () => {

        const action: IngredientsActionTypes = { 
            type: REMOVE_CURRENT_INGREDIENT
        };

        const expectedState = {
            ...initialState,
            currentIngredient: null, 
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

});
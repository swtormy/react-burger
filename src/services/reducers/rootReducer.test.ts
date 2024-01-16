import { AnyAction } from "redux";
import rootReducer from "./rootReducer";
import {initialState as InitialStateOfUserReducer} from "./userReducer";
import {initialState as InitialStateOfIngredientsReducer} from "./ingredientsReducer";
import {initialState as InitialStateOfConstructorReducer} from "./constructorReducer";
import {initialState as InitialStateOfOrderReducer} from "./orderReducer";
import {InitialStore as InitialStateOfSocketReducer} from "./wsReducer";

describe('rootReducer', () => {
    it('Store initial state', () => {
        expect(rootReducer(undefined, {} as AnyAction)).toEqual({
            user: InitialStateOfUserReducer,
            ingredients: InitialStateOfIngredientsReducer,
            burger_constructor: InitialStateOfConstructorReducer,
            order: InitialStateOfOrderReducer,
            socket: InitialStateOfSocketReducer
        });
    });

});
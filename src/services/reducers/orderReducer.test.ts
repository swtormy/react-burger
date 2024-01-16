import { OrderActionTypes } from "../../utils/models";
import { GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, REMOVE_CURRENT_ORDER } from "../actions/order";
import orderReducer from "./orderReducer";


const initialState = {
    order: null,
    isLoading: false,
    error: null,
};

describe('orderReducer', () => {


    it('Order initialized', () => {
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        expect(orderReducer(undefined, unknownAction as any)).toEqual(initialState);
    });

    it('Get order request', () => {

        const action: OrderActionTypes = { type: GET_ORDER_REQUEST };
        const newState = orderReducer(initialState, action);

        const expectedState = {
            order: null,
            isLoading: true,
            error: null,
        };

        expect(newState).toEqual(expectedState);
    });

    it('Get order success', () => {
        const initialState = {
            order: null,
            isLoading: false,
            error: null,
        };

        const orderPayload = 31708

        const action: OrderActionTypes = {
            type: GET_ORDER_SUCCESS,
            payload: orderPayload,
        }
        const newState = orderReducer(initialState, action);

        const expectedState = {
            order: orderPayload,
            isLoading: false,
            error: null,
        };

        expect(newState).toEqual(expectedState);
    });

    it('Get order error', () => {
        const errorMessage = 'An error occurred while fetching the order.';
        const action: OrderActionTypes = {
            type: GET_ORDER_ERROR,
            payload: errorMessage as any,
        };

        const newState = orderReducer(initialState, action);

        const expectedState = {
            ...initialState,
            isLoading: false,
            error: errorMessage,
        };

        expect(newState).toEqual(expectedState);
    });

    it('Remove current order', () => {
        
        const action: OrderActionTypes = {
            type: REMOVE_CURRENT_ORDER,
        };

        const newState = orderReducer(initialState, action);

        const expectedState = {
            ...initialState,
            order: null,
        };

        expect(newState).toEqual(expectedState);
    });
});
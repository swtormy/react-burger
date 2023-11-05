import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    REMOVE_CURRENT_ORDER,
} from '../actions/order';

const initialState = {
    order: null,
    isLoading: false,
    error: null,
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
            };
        case GET_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case REMOVE_CURRENT_ORDER:
            return {
                ...state,
                order: null,
            };
        default:
            return state;
    }
}

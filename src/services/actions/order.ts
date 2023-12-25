import { ThunkAction } from 'redux-thunk';
import { createOrder as fetchOrder } from '../../utils/burger-api';
import { removeAllIngredients } from './constructor'
import { RootState } from '../store';
import { Order, OrderActionTypes, RemoveCurrentOrderAction, UpdateOrderListAction, UpdateOwnOrderListAction } from '../../utils/models';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const REMOVE_CURRENT_ORDER = 'REMOVE_CURRENT_ORDER';

export const UPDATE_ORDER_LIST = 'UPDATE_ORDER_LIST';
export const UPDATE_OWN_ORDER_LIST = 'UPDATE_OWN_ORDER_LIST';

export const createOrder = (ids: string[]): ThunkAction<void, RootState, unknown, OrderActionTypes> => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });

        fetchOrder(ids)
            .then(data => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: data.order.number,
                });
                dispatch(removeAllIngredients())
            })
            .catch(error => {
                dispatch({
                    type: GET_ORDER_ERROR,
                    payload: error,
                });
                dispatch({
                    type: REMOVE_CURRENT_ORDER,
                });
            });
    };
};


export const removeCurrentOrder = (): RemoveCurrentOrderAction => {
    return {
        type: REMOVE_CURRENT_ORDER,
    };
};

export const updateOrderList = (orders: Order[]): UpdateOrderListAction => {
    return {
        type: UPDATE_ORDER_LIST,
        payload: orders,
    }
};

export const updateOwnOrderList = (orders: Order[]): UpdateOwnOrderListAction => {
    return {
        type: UPDATE_OWN_ORDER_LIST,
        payload: orders,
    }
};
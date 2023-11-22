import { createOrder as fetchOrder } from '../../utils/burger-api';
import { removeAllIngredients } from './constructor'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const REMOVE_CURRENT_ORDER = 'REMOVE_CURRENT_ORDER';

export const createOrder = (ids) => {
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


export const removeCurrentOrder = () => {
    return {
        type: REMOVE_CURRENT_ORDER,
    };
};
import { createOrder as fetchOrder } from '../../utils/burger-api';


export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE';

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
            })
            .catch(error => {
                dispatch({
                    type: GET_ORDER_FAILURE,
                    payload: error,
                });
            });
    };
};


export const removeCurrentOrder = () => {
    return {
        type: REMOVE_CURRENT_ORDER,
    };
};
import React from "react";
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderList, updateOwnOrderList } from '../services/actions/order';
import { Order, WebSocketResponse } from '../utils/models';
import { useAppDispatch } from "./redux-hooks";

const useWebSocket = (url: string, type: "all" | "own") => {
    const dispatch = useAppDispatch()
    const [error, setError] = React.useState<Event | null>(null);
    const [total, setTotal] = React.useState<number>(0);
    const [totalToday, setTotalToday] = React.useState<number>(0);

    const connectWebSocket = useCallback(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket подключён');
        };

        socket.onmessage = event => {
            const data: WebSocketResponse = JSON.parse(event.data);
            if (data.success) {
                if(type === "all"){
                    dispatch(updateOrderList(data.orders))
                    setTotal(data.total)
                    setTotalToday(data.totalToday)
                } else {
                    dispatch(updateOwnOrderList(data.orders))
                }
                
            }
        };

        socket.onerror = event => {
            setError(event);
        };

        socket.onclose = () => {
            console.log('WebSocket отключён');
        };

        return () => {
            socket.close();
        };
    }, [url]);

    React.useEffect(() => {
        const disconnectWebSocket = connectWebSocket();
        return () => {
            disconnectWebSocket();
        };
    }, [connectWebSocket]);

    return {
        total, totalToday, error
    };
};


export default useWebSocket;

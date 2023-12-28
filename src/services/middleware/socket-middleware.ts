import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, AnyAction, Dispatch, Middleware, MiddlewareAPI, MiddlewareArray } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { TWsActions, wsAddOrders, wsAddOwnOrders } from "../actions/ws-actions";
import { WebSocketResponse } from "../../utils/models";

export type TwsActrionTypes = {
    connect: ActionCreatorWithPayload<string>,
    disconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
};

export const createSocketMiddleware = (wsActions: TwsActrionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null
        let url = ""
        let isConnected = false
        let reconnectedTimerId = 0

        return (next) => (action: TWsActions) => {
            const { dispatch } = store
            const { connect, disconnect, wsClose, wsConnecting, wsError, wsOpen } = wsActions

            if (connect.match(action)) {
                url = action.payload
                socket = new WebSocket(url)
                isConnected = true
                reconnectedTimerId = 0
                dispatch(wsConnecting())
            }

            if (socket && wsConnecting.match(action)) {
                socket.onopen = () => {
                    dispatch(wsOpen())
                }

                socket.onerror = () => {
                    dispatch(wsError("WebSocket Error"))
                }

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event
                    try {
                        const parseData: WebSocketResponse = JSON.parse(data)
                        if(url.includes("token")){
                            dispatch(wsAddOwnOrders(parseData))
                        } else {
                            dispatch(wsAddOrders(parseData))
                        }
                    } catch (err) {
                        console.error(err);
                        dispatch(wsError("Incorrect data"))
                    }
                }

                socket.onclose = (event: CloseEvent) => {
                    if(event.code !== 1000) {
                        console.error("Connection error");
                        dispatch(wsError(`Error: ${event.code}`))
                    }
                    if(isConnected) {
                        reconnectedTimerId = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 3000)
                    }
                    dispatch(wsClose())
                }


            }

            if (socket && disconnect.match(action)) {
                isConnected = false
                window.clearTimeout(reconnectedTimerId)
                reconnectedTimerId = 0
                socket.close()
            }

            next(action)
        }
    }
}
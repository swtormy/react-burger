import { createAction } from "@reduxjs/toolkit"
import { Order, WebSocketResponse } from "../../utils/models"

export const connect = createAction<string, "WS_CONNECT">("WS_CONNECT")
export const disconnect = createAction("WS_DISCONNECT")
export const wsConnecting = createAction("WS_CONNECTING")
export const wsOpen = createAction("WS_OPEN")
export const wsClose = createAction("WS_CLOSE")
export const wsError = createAction<string, "WS_ERROR">("WS_ERROR")
export const wsAddOrders = createAction<WebSocketResponse, "WS_ADDORDERS">("WS_ADDORDERS")
export const wsAddOwnOrders = createAction<WebSocketResponse, "WS_ADDOWNORDERS">("WS_ADDOWNORDERS")


export type TWsActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsError>
    | ReturnType<typeof wsAddOrders>
    | ReturnType<typeof wsAddOwnOrders>
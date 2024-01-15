import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsOpen, wsAddOrders, wsAddOwnOrders } from "../actions/ws-actions";
import { Order, WebSocketResponse } from "../../utils/models";

export enum WebsocketStatus {
    OFFLINE = "OFFLINE",
    CONNECTING = "CONNECTING",
    ONLINE = "ONLINE",
}

export type TWSStore = {
    status: WebsocketStatus;
    connectionError: string;
    allOrders: WebSocketResponse | null;
    ownOrders: WebSocketResponse | null;
}

export const InitialStore: TWSStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: "",
    allOrders: null,
    ownOrders: null
}


export const socketReducer = createReducer(InitialStore, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload
        })
        .addCase(wsAddOrders, (state, action) => {
            state.allOrders = action.payload
        })
        .addCase(wsAddOwnOrders, (state, action) => {
            state.ownOrders = action.payload
        })
})
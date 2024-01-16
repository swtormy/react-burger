import { WebSocketResponse } from "../../utils/models";
import { wsAddOrders, wsAddOwnOrders, wsConnecting, wsOpen } from "../actions/ws-actions";
import { TWSStore, WebsocketStatus, socketReducer } from "./wsReducer";

export const InitialStore: TWSStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: "",
    allOrders: null,
    ownOrders: null
}

const wsData: WebSocketResponse = {
    success: true,
    orders: [
        {
            _id: "65a5186687899c001b8292b6",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0947",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Фалленианский флюоресцентный бургер",
            createdAt: "2024-01-15T11:35:02.345Z",
            updatedAt: "2024-01-15T11:35:02.867Z",
            number: 31708
        },
        {
            _id: "65a50b8887899c001b82929a",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0945",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0940"
            ],
            status: "done",
            name: "Антарианский люминесцентный флюоресцентный метеоритный бургер",
            createdAt: "2024-01-15T10:40:08.278Z",
            updatedAt: "2024-01-15T10:40:08.713Z",
            number: 31707
        }
    ],
    total: 31334,
    totalToday: 49
};

describe('socketReducer', () => {
    it('WebSocket: Connect', () => {
        expect(socketReducer(InitialStore, wsConnecting())).toEqual({
            ...InitialStore,
            status: WebsocketStatus.CONNECTING
        });
    });

    it('WebSocket: Open', () => {
        expect(socketReducer(InitialStore, wsOpen())).toEqual({
            ...InitialStore,
            status: WebsocketStatus.ONLINE
        });
    });

    it('WebSocket: Add orders', () => {

        expect(socketReducer(InitialStore, wsAddOrders(wsData))).toEqual({
            ...InitialStore,
            allOrders: wsData
        });
    });

    it('WebSocket: Add user orders', () => {
        expect(socketReducer(InitialStore, wsAddOwnOrders(wsData))).toEqual({
            ...InitialStore,
            ownOrders: wsData
        });
    });
});
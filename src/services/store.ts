import { createStore, applyMiddleware, compose, Action, StoreEnhancer } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers/rootReducer'
import {
  connect as WSConnect,
  disconnect as WSDisconnect,
  wsConnecting as WSConnecting,
  wsOpen as WSOpen,
  wsClose as WSClose,
  wsError as WSError,
} from "./actions/ws-actions"
import { createSocketMiddleware } from './middleware/socket-middleware';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const ordersWsActions = {
  connect: WSConnect,
  disconnect: WSDisconnect,
  wsConnecting: WSConnecting,
  wsOpen: WSOpen,
  wsClose: WSClose,
  wsError: WSError,
}
const feedWsActions = {
  connect: WSConnect,
  disconnect: WSDisconnect,
  wsConnecting: WSConnecting,
  wsOpen: WSOpen,
  wsClose: WSClose,
  wsError: WSError,
}

const webSocketMiddlewareOrders = createSocketMiddleware(ordersWsActions)
const webSocketMiddlewareFeed = createSocketMiddleware(feedWsActions)

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const enhancer: StoreEnhancer<{ dispatch: unknown }, {}> = composeEnhancers(applyMiddleware(thunk, webSocketMiddlewareOrders, webSocketMiddlewareFeed));
const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>

export default store;

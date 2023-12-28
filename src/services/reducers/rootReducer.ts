import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructorReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
import { socketReducer } from './wsReducer';


const rootReducer = combineReducers({
    user: userReducer,
    ingredients: ingredientsReducer,
    burger_constructor: constructorReducer,
    order: orderReducer,
    socket: socketReducer
});


export default rootReducer;
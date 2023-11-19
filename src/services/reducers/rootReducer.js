import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructorReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger_constructor: constructorReducer,
    order: orderReducer,
    user: userReducer,
});

export default rootReducer;
import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructorReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    user: userReducer,
    ingredients: ingredientsReducer,
    burger_constructor: constructorReducer,
    order: orderReducer,
});


export default rootReducer;
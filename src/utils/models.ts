import { ADD_BUNS, ADD_INGREDIENT, REMOVE_ALL_INGREDIENTS, REMOVE_INGREDIENT, UPDATE_ORDER_INDEX } from "../services/actions/constructor";
import { ADD_CURRENT_INGREDIENT, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, REMOVE_CURRENT_INGREDIENT } from "../services/actions/ingredients";
import { GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, REMOVE_CURRENT_ORDER, UPDATE_ORDER_LIST, UPDATE_OWN_ORDER_LIST } from "../services/actions/order";
import { LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REFRESH_TOKEN_FAIL, REFRESH_TOKEN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, RESET_PASSWORD_ACCESS, SAVE_REDIRECT_PATH } from "../services/actions/user";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS } from "../services/actions/ws-action-types";

export type TIngredientExtended = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    position?: string,
    instanceId?: string,
    orderIndex?: number,
};

export type TDraggableElement = {
    isHover: boolean,
    ing: TIngredientExtended,
    handleDeleteItem: (item: TIngredientExtended) => void,
    setHoveredId: React.Dispatch<React.SetStateAction<number | null>>,
}

export type TFormValues = {
    [key: string]: string;
}


export type TResponseData = {
    success: boolean;
    [key: string]: any;
}

export type TUserProfileData = {
    [key: string]: string;
}

export type TErrorResponseData = Pick<TResponseData, "success"> & {
    message: string;
}

export type TRequestOptions = {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: string;
}

export type TJWTDecode = {
    id: string,
    iat: number,
    exp: number
}

export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    payload: TIngredientExtended;
}

export interface AddBunsAction {
    type: typeof ADD_BUNS;
    payload: TIngredientExtended[];
}

export interface RemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT;
    payload: string;
}

export interface RemoveIngredientsAction {
    type: typeof REMOVE_ALL_INGREDIENTS;
}

export interface UpdateOrderIndexAction {
    type: typeof UPDATE_ORDER_INDEX;
    payload: { oldIndex: number | undefined; newIndex: number };
}

export type BurgerActions = AddIngredientAction | AddBunsAction | RemoveIngredientAction | RemoveIngredientsAction | UpdateOrderIndexAction;

export interface ConstructorState {
    constructorIngredients: TIngredientExtended[];
}

export interface GetIngredientsRequestAction {
    type: typeof GET_INGREDIENTS_REQUEST;
}

export interface GetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS;
    payload: TIngredientExtended[];
}

export interface GetIngredientsErrorAction {
    type: typeof GET_INGREDIENTS_ERROR;
    payload: Error;
}

export interface AddCurrentIngredientAction {
    type: typeof ADD_CURRENT_INGREDIENT;
    payload: TIngredientExtended;
}

export interface RemoveCurrentIngredientAction {
    type: typeof REMOVE_CURRENT_INGREDIENT;
}

export type IngredientsActionTypes = GetIngredientsRequestAction | GetIngredientsSuccessAction
    | GetIngredientsErrorAction
    | AddCurrentIngredientAction
    | RemoveCurrentIngredientAction

export interface IngredientsState {
    ingredientsList: TIngredientExtended[];
    currentIngredient: TIngredientExtended | null;
    isLoading: boolean;
    error: Error | null;
}


export interface RemoveCurrentOrderAction {
    type: typeof REMOVE_CURRENT_ORDER;
}

export interface UpdateOrderListAction {
    type: typeof UPDATE_ORDER_LIST;
    payload: Order[];
}
export interface UpdateOwnOrderListAction {
    type: typeof UPDATE_OWN_ORDER_LIST;
    payload: Order[];
}

export type OrderActionTypes = { type: typeof GET_ORDER_REQUEST }
    | { type: typeof GET_ORDER_SUCCESS; payload: number }
    | { type: typeof GET_ORDER_ERROR; payload: Error }
    | UpdateOwnOrderListAction | UpdateOrderListAction | RemoveCurrentOrderAction | RemoveIngredientsAction


export interface Order {
    _id: string;
    status: 'done' | 'pending';
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    ingredients: string[];
}

export type OrderState = {
    order: number | null,
    orderList: Order[];
    ownOrderList: Order[];
    isLoading: boolean,
    error: Error | null,
}

export interface User {
    email: string;
    name: string;
}

// export interface Tokens {
//     user?: User;
//     accessToken: string;
//     refreshToken: string;
// }


export interface SaveRedirectPathAction {
    type: typeof SAVE_REDIRECT_PATH;
    payload: string;
}

export interface RefreshTokenSuccessAction {
    type: typeof REFRESH_TOKEN_SUCCESS;
    payload: any;
}

export interface RefreshTokenFailAction {
    type: typeof REFRESH_TOKEN_FAIL;
}

export interface LogOutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

export interface LogoutFailAction {
    type: typeof LOGOUT_FAIL;
    payload: TResponseData;
}

export interface AllowResetPasswordAccessAction {
    type: typeof RESET_PASSWORD_ACCESS;
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: any;
}

export interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: any;
}
export interface RegisterFailAction {
    type: typeof REGISTER_FAIL;
    payload: TResponseData;
}

export type AuthActionTypes =
    SaveRedirectPathAction | RefreshTokenSuccessAction | RefreshTokenFailAction | LogOutSuccessAction |
    AllowResetPasswordAccessAction | LogoutFailAction |
    LoginSuccessAction | RegisterSuccessAction | RegisterFailAction

export type UserStoreState = {
    user_info: User | null;
    token: string | null;
    resetPasswordAccess: boolean;
    redirectPath: string | null;
}

export interface WebSocketResponse {
    success: boolean;
    orders: Order[];
    total: number;
    totalToday: number;
}

export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
  };
import { OrderActions } from './action';
import { LoadingState } from '../Components/model';
import { OrderState } from './state';
import produce from 'immer';

const initialState: OrderState = {
    orders: [],
    loading: LoadingState.NotLoaded
}

export function orderReducer(state: OrderState = initialState, action: OrderActions): OrderState {
    switch (action.type) {
        case '@@order/LOADED_ORDER':
            return {
                ...state,
                loading: LoadingState.Loaded,
                orders: action.orders
            }
        case '@@order/LOADED_ORDER_LATEST':
            return {
                ...state,
                loading: LoadingState.Loaded,
                orders: action.orders
            }
        case '@@order/LOADED_ORDER_PAYMENT':
            return {
                ...state,
                loading: LoadingState.Loaded,
                orders: action.orders
            }
        case '@@order/LOADED_ORDER_ADMIN':
            return {
                ...state,
                loading: LoadingState.Loaded,
                orders: action.orders
            }
            
    }
    return state;
}
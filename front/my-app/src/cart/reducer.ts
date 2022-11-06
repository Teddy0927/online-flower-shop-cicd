import { CartActions } from './action';
import { LoadingState } from '../Components/model';
import { CartState } from './state';
import produce from 'immer';

const initialState: CartState = {
    carts: [],
    loading: LoadingState.NotLoaded,
}

export function cartReducer(state: CartState = initialState, action: CartActions): CartState {
    switch (action.type) {
        case '@@cart/LOADED_CART':
            return {
                ...state,
                loading: LoadingState.Loaded,
                carts: action.carts
            }
        case '@@cart/ADD_TO_CART':
            return produce(state, state => {
                state.carts.push(action.cart); 

                state.carts.sort()
            })
        case '@@cart/CLEARED_CART':
            return {
                ...state,
                carts: []
            }
    }
    return state;
}

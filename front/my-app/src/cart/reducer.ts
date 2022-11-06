import { CartActions } from './action';
import { LoadingState } from '../Components/model';
import { CartState } from './state';
import { Cart } from './state';
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
                // console.log(action.alt, action.category, action.name, action.photo, action.price, action.style, action.category)
                // state.carts.push(action._id, action.alt, action.category, action.name, action.photo, action.price, action.style, action.category)
                // state.carts.push(action.alt)
                // state.carts.push(action.category)
                state.carts.sort()
            })
        // case '@@cart/INCREASED_QUANTITY':
        //     return produce(state, state => {
        //         const index = state.carts.indexOf(action.cart)
        //         console.log('increase quantity: ',index)
                
        //     })
        // case '@@cart/REMOVE_FROM_CART':
        //     return produce(state, state => {
        //         const index = state.carts.indexOf(action.cart._id)
        //         state.carts.splice(index, 1)
        //     })
        case '@@cart/CLEARED_CART':
            return {
                ...state,
                carts: []
            }
    }
    return state;
}

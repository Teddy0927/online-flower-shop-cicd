import { LoadingState } from '../Components/model';
import { ItemsActions } from './action';
import { ItemState } from './state';
import produce from 'immer';
import { addToCart, removeFromCart } from '../cart/action';

const initialState: ItemState = {
    loading: LoadingState.NotLoaded,
    items: [],
}

export const itemReducer = (state: ItemState = initialState, action: ItemsActions): ItemState => {
    switch (action.type) {
        case '@@item/LOADED_ONE_ITEM':
            return produce(state, state => {
                const itemIndex = state.items.findIndex(item => item._id === action.item._id)
                // console.log('items reducer result: ', itemIndex)
                // console.log("item id: ", state.items[0]);
                // console.log("action id: ", action.item._id);
                if (itemIndex === -1) {
                    state.items.push(action.item);
                    // console.log(state.items);
                } else {
                    state.items[itemIndex] = action.item
                }
                state.items[itemIndex] = action.item
            })
        // default:
        //     return state;
        case '@@item/LOADED_ITEMS':
            return {
                ...state,
                items: action.items,
                loading: LoadingState.Loaded
            }
        case '@@item/LOADED_FRONT_ITEM':
            return {
                ...state,
                items: action.items,
                loading: LoadingState.Loaded
            }
    }

    return state
}
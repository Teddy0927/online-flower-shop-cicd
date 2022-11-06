import { AppDispatch } from "../store";
import axios from 'axios';
import { checkResponse, login } from "../auth/action";
import { Cart } from "./state";

export function loadedCart(carts: Cart[]) {
    return {
        type: '@@cart/LOADED_CART' as const,
        carts
    }
}

export function addToCart(cart: Cart) {
    return {
        type: '@@cart/ADD_TO_CART' as const,
        cart
    }
}

export function removeFromCart(_id: string) {
    return {
        type: '@@cart/REMOVE_FROM_CART' as const,
        _id
    }
}

export function clearedCart() {
    return {
        type: '@@cart/CLEARED_CART' as const,
    }
}

export function increasedQuantity(_id: string) {
    return {
        type: '@@cart/INCREASED_QUANTITY' as const,
        _id,
    }
}

export function decreasedQuantity(_id: string) {
    return {
        type: '@@cart/DECREASED_QUANTITY' as const,
        _id,
    }
}

type LoadedCartAction = ReturnType<typeof loadedCart>;
type AddToCartAction = ReturnType<typeof addToCart>;
type RemoveFromCartAction = ReturnType<typeof removeFromCart>;
type ClearedCartAction = ReturnType<typeof clearedCart>;
type IncreasedQuantity = ReturnType<typeof increasedQuantity>;
type DecreasedQuantity = ReturnType<typeof decreasedQuantity>;

export type CartActions = LoadedCartAction | AddToCartAction | RemoveFromCartAction | ClearedCartAction | IncreasedQuantity | DecreasedQuantity;


export function loadCart() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart`)

        dispatch(checkResponse(res))

        dispatch(loadedCart(res.data.map((row: any) => row)))
    }
}

export function fetchAddToCart(_id: string, alt: string, name: string, style: string, price: number, category: string, photo: string) {
    return async (dispatch: AppDispatch) => {         
        try {
            const res = await axios.post('/cart', {
                item_id: _id,
                item_alt: alt,
                item_name: name,
                item_style: style,
                item_price: price,
                item_category: category,
                item_photo: photo,
                item_quantity: 1,
            })
            dispatch(addToCart(res.data))
            dispatch(checkResponse(res))
            dispatch(loadCart());
            alert('Added to cart')

        } catch (err) {
            dispatch(loadCart())
        }
    }
}

export function fetchRemoveFromCart(_id: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(removeFromCart(_id))
        try {
            const res = await axios.delete(`/cartItem/${_id}`)
            dispatch(checkResponse(res))
            dispatch(loadCart());

        } catch (err) {
            dispatch(loadCart())
        }
    }
}

export function fetchIncreaseQuantity(_id: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(increasedQuantity(_id))
        try {
            const res = await axios.patch(`/cartItemPlus/${_id}`)
            dispatch(checkResponse(res));
            dispatch(loadCart());
        } catch (err) {
            dispatch(loadCart());
        }
    }
}

export function fetchDecreaseQuantity(_id: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(decreasedQuantity(_id))
        try {
            const res = await axios.patch(`/cartItemMinus/${_id}`)
            dispatch(checkResponse(res));
            dispatch(loadCart());
        } catch (err) {
            dispatch(loadCart());
        }
    }
}


export function clearCart() {
    return async (dispatch: AppDispatch) => {
        const res = await axios.delete('/clearCart')
        dispatch(checkResponse(res));
        dispatch(clearedCart());
    }
}
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { itemReducer } from './items/reducer';
import { cartReducer } from './cart/reducer';
import { orderReducer } from './order/reducer';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const reducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    items: itemReducer,
    order: orderReducer
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const store = configureStore({
    reducer: reducers
});
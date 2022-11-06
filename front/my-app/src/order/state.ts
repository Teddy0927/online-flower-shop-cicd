import { Cart } from "../cart/state";
import { LoadingState } from "../Components/model";

export interface Order {
    _id: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    city: string,
    country: string,
    postalCode: string,
    state: string,
    carts: Cart[],
    status: string,
    displayMoney: string,
    created_at: Date,
    lastModified: Date,
    payment_verify_photo: string
}

export interface OrderState {
    orders: Order[];
    loading: LoadingState;
}
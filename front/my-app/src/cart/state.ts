import { LoadingState } from '../Components/model';

export interface Cart {
    _id: string,
    item_alt: string,
    item_name: string,
    item_style: string,
    item_price: number,
    item_category: string,
    item_photo: string,
    quantity: number,
}

export interface CartState {
    carts: Cart[];
    loading: LoadingState;
}
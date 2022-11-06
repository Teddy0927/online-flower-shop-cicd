import { LoadingState } from "../Components/model";

export interface Item {
    _id: string,
    item_alt: string,
    item_name: string,
    item_style: string,
    item_price: number,
    item_category: string,
    item_photo: string,
    item_id: string,
    quantity: number | undefined,
    user_id: string
}

export interface ItemState {
    loading: LoadingState;
    items: Item[];
}
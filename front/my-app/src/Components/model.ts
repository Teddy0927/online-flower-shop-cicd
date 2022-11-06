export interface Item {
    item_category: string;
    _id: string;
    item_photo: string;
    item_alt: string;
    item_name: string;
    item_style: string;
    item_price: number;
} 
 
export interface Type {
    type: string;
}

export enum LoadingState {
    NotLoaded,
    Loading,
    Loaded
}
import { ObjectId } from 'mongodb';

export default class item {
    constructor(
        public src: string,
        public alt: string,
        public name: string,
        public style: string,
        public price: number,
        public type: string,
        public id?: ObjectId
        ) {}
}

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

export interface User {
    id: ObjectId;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
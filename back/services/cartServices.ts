import { connectToDatabase } from '../testing';
import { Db, ObjectId } from "mongodb";

export class cartService {
    private dbConnection: Promise<Db>;

    constructor() {
        this.dbConnection = connectToDatabase();
    }

    getCart = async (id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('cart').find({user_id: {$eq: id}}).toArray();
        return result
    }

    getCartQuantity = async(cart_id: string) => {
        let result = await (await this.dbConnection).collection('cart').find({_id: new ObjectId(cart_id)}).toArray();
        return result
    }

    postCart = async (user_id: ObjectId | undefined, item_id: string, item_alt: string, item_name: string, item_style: string, item_price: number, item_category: string, item_photo: string, quantity: number) => {
        let result = await (await this.dbConnection).collection('cart').insertOne({user_id, item_id, item_alt, item_name, item_style, item_price, item_category, item_photo, quantity});
        return result
    }

    plusCartItem = async (cart_id: string, newQuantity: number) => {
        let result = await (await this.dbConnection).collection('cart').updateOne({_id: new ObjectId(cart_id)}, {$set: {quantity: newQuantity}})
        return result
    }

    minusCartItem = async (cart_id: string, newQuantity: number) => {
        let result = await (await this.dbConnection).collection('cart').updateOne({_id: new ObjectId(cart_id)}, {$set: {quantity: newQuantity}})
        return result
    }

    deleteCartItem = async (cart_id: string) => {
        let result = await (await this.dbConnection).collection('cart').deleteOne({_id: {$eq: new ObjectId(cart_id)}});
        return result
    }

    clearCart = async (id: ObjectId | undefined) => {
        let result = await (await this.dbConnection).collection('cart').deleteMany({user_id: {$eq: id}});
        return result
    }
}
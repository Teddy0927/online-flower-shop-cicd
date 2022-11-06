import { Request, Response } from 'express';
import { cartService } from '../services/cartServices';
import { logger } from '../util/logger';
// import { form } from '../util/middleware';
// import { connectToDatabase } from '../testing';
// import { Db } from 'mongodb';

export class cartController {
    // private dbConnection: Promise<Db>;
    constructor(
        private cartService: cartService
    ) {
        // this.dbConnection = connectToDatabase();
    }

    getCart = async (req: Request, res: Response) => {
        const id = req.user?.id;
        console.log('get cart id: ', id)
        try {
            const cart = await this.cartService.getCart(id);
            if (cart) {
                console.log('get cart item', cart)
                res.status(200).json(cart);
            } else {
                res.json('fail')
            }

        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }

    }

    postCart = async (req: Request, res: Response) => {
        console.log('post cart: ', req.body)
        console.log('user_id: ', req.user?.id)
        try {
            let user_id = req.user?.id;
            let item_id = req.body.item_id;
            let item_alt = req.body.item_alt;
            let item_name = req.body.item_name;
            let item_style = req.body.item_style;
            let item_price = req.body.item_price;
            let item_category = req.body.item_category;
            let item_photo = req.body.item_photo;
            let quantity = 1
            // const cart = await (await this.dbConnection).collection('cart').insertOne({id, item_id});
            const cart = await this.cartService.postCart(user_id, item_id, item_alt, item_name, item_style, item_price, item_category, item_photo, quantity);
            console.log('cart result: ', cart)
            cart
                ? res.status(201).send(`Successfully added a item to cart with id ${cart.insertedId}`)
                : res.status(500).send('Failed to add a item to cart')
        } catch (err) {
            logger.error('post cart catch: ', err);
            res.status(500).json('Internal Server Error');
        }
    }

    deleteCartItem = async (req: Request, res: Response) => {
        try {
            // console.log('check passed what in body: ', req.params)
            let cart_id = req.params.id
            const cart = await this.cartService.deleteCartItem(cart_id)
            console.log('cart_id is what controller: ', cart_id)
            console.log('check deleted count: ', cart.deletedCount)
            cart
                ? res.status(200).send(`Successfully removed a item to cart with deleted count ${cart.deletedCount}`)
                : res.status(500).send('Failed to remove the item from cart')
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }
    }

    PlusCartItem = async (req: Request, res: Response) => {
        try {
            let cart_id = req.params.id
            let currentQuantity = await this.cartService.getCartQuantity(cart_id)
            let newQuantity = currentQuantity[0]['quantity'] + 1
            const cart = await this.cartService.plusCartItem(cart_id, newQuantity)
            cart
                ? res.status(200).send('Successfully update the quantity')
                : res.status(400).send('Failed to update the quantity')
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    }

    MinusCartItem = async (req: Request, res: Response) => {
        try {
            let cart_id = req.params.id
            let currentQuantity = await this.cartService.getCartQuantity(cart_id)
            let newQuantity = currentQuantity[0]['quantity'] - 1
            const cart = await this.cartService.minusCartItem(cart_id, newQuantity)
            cart
                ? res.status(200).send('Successfully update the quantity')
                : res.status(400).send('Failed to update the quantity')
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    }

    clearCart = async (req: Request, res: Response) => {
        try {
            let id = req.user?.id;
            const cart = await this.cartService.clearCart(id);
            console.log('check deleted count: ', cart.deletedCount)
            cart
                ? res.status(200).send(`Successfully cleared the cart with deleted count ${cart.deletedCount}`)
                : res.status(500).send('Failed to clear the cart')
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    }
    
}
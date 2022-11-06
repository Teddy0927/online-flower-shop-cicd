import express from 'express';
import { cartController } from '../controllers/cartController';
import { cartService } from '../services/cartServices';
import { userMiddleware } from '../util/middleware';

export const cartRoutes = express.Router();

cartRoutes.use(express.json());

const cart = new cartService();
export const CartController = new cartController(cart);

// Get cart item
cartRoutes.get('/cart', userMiddleware, CartController.getCart);
// cartRoutes.get('/cartQuantity/:id', userMiddleware, CartController.getCartQuantity)
cartRoutes.post('/cart', userMiddleware, CartController.postCart);
// Remove one from cart
cartRoutes.delete('/cartItem/:id', userMiddleware, CartController.deleteCartItem)
// Increase quantity
cartRoutes.patch('/cartItemPlus/:id', userMiddleware, CartController.PlusCartItem)
// Decrease quantity
cartRoutes.patch('/cartItemMinus/:id', userMiddleware, CartController.MinusCartItem)
// Clear cart
cartRoutes.delete('/clearCart', userMiddleware, CartController.clearCart);
// CRUD

// Get all item

// Get item by id

// Create item

// Update item

// Delete item
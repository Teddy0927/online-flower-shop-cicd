import express from 'express';
import { itemController } from '../controllers/itemController';
import { itemService } from '../services/itemServices'
import { isAdmin, userMiddleware } from '../util/middleware';

export const itemRoutes = express.Router();

itemRoutes.use(express.json())

const item = new itemService();
export const ItemController = new itemController(item);
// CRUD

// Get all item
itemRoutes.get('/collection', ItemController.getItems);
// Get item by type
itemRoutes.get('/collection/:id', ItemController.getItemsByCol);
// Get item by type for Front page
itemRoutes.get('/collectionFront/:id', ItemController.getItemsFrontByCol);
// Get item by id
itemRoutes.get('/item/:id', ItemController.getOneItem);
// Create item
itemRoutes.post('/item', userMiddleware, isAdmin, ItemController.createItem);
// Update item
itemRoutes.patch('/item/:id', userMiddleware, isAdmin, ItemController.updateItem);
// Delete item
itemRoutes.delete('/item/:id', userMiddleware, isAdmin, ItemController.deleteItem);



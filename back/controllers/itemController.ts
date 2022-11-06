import { Request, Response } from 'express';
import { itemService } from '../services/itemServices';
import { logger } from '../util/logger';
import { form } from '../util/middleware';
import { connectToDatabase } from '../testing';
import { ObjectId, Db } from 'mongodb';

export class itemController {
    private dbConnection: Promise<Db>;
    constructor(
        private itemService: itemService
    ) {
        this.dbConnection = connectToDatabase();
    }

    getItems = async (req: Request, res: Response) => {
        try {
            const items = await this.itemService.itemAll();

            if (items) {
                res.status(200).json(items);
            } else {
                res.json({ status: 'fail', result: ['Fail to get items'] })
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    };

    getItemsByCol = async (req:Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await (await this.dbConnection).collection('items').find({item_category: id}).toArray();

            if (result) {
                res.status(200).json(result);
            } else {
                res.json({ status: 'fail', result: ['Fail to get items'] })    
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }
    }

    getItemsFrontByCol = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await (await this.dbConnection).collection('items').find({item_category: {$eq: id}}).limit(4).toArray();

            if (result) {
                res.status(200).json(result);
            } else {
                res.json({ status: 'fail', result: ['Fail to get items'] })    
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }
    }

    getOneItem = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            // console.log('get one item: ', id);
            const result = await (await this.dbConnection).collection('items').find(new ObjectId(id)).toArray();
            // console.log('new stuff: ', new ObjectId(id));
    
            if (result) {
                res.status(200).json(result);
                // console.log('result of find one item: ', result);
            } else {
                res.json({ status: 'fail', result: ['Fail to get items'] })    
            }
        } catch (err) {
            logger.error('get One item boom boom: ', err);
            res.status(500).json('Internal Server Error')
        }
    }

    createItem = async (req: Request, res: Response) => {
        form.parse(req, async (err, fields, files) => {
            try {
                console.log("data: ", fields)
                let item_alt = fields.item_alt;
                let item_name = fields.item_name;
                let item_style = fields.item_style;
                let item_price = fields.item_price;
                let item_category = fields.item_category;
                let item_photo = files.item_photo != null && !Array.isArray(files.item_photo) ? files.item_photo.newFilename : null;
                let result = await (await (this.dbConnection)).collection('items').insertOne({ item_alt, item_name, item_style, item_price, item_category, item_photo });
                result
                    ? res.status(200).send(`Successfully created a new item with id ${result.insertedId}`)
                    : res.status(500).send('Failed to create a new item')
                // res.end;
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error');
            }
        })
    };

    updateItem = async (req: Request, res: Response) => {
        const id = req.params.id;
        form.parse(req, async (err, fields, files) => {
            try {
                const query = { _id: new ObjectId(id) };
                let item_alt = fields.item_alt;
                let item_name = fields.item_name;
                let item_style = fields.item_style;
                let item_price = fields.item_price;
                let item_category = fields.item_category;
                let item_photo = files.item_photo != null && !Array.isArray(files.item_photo) ? files.item_photo.newFilename : null;
                let result

                if (item_photo != null) {
                    result = await (await (this.dbConnection)).collection('items').updateOne(query, {$set: { item_alt: item_alt, item_name: item_name, item_style: item_style, item_price: item_price, item_category: item_category, item_photo: item_photo }});
                }else {
                    result = await (await (this.dbConnection)).collection('items').updateOne(query, {$set: { item_alt: item_alt, item_name: item_name, item_style: item_style, item_price: item_price, item_category: item_category }});
                }
               
                result
                    ? res.status(200).send(`Successfully patched a item with new id ${id}`)
                    : res.status(304).send(`Failed to update a item with id ${id}`)
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error');
            }
        })
    };

    deleteItem = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await this.itemService.DeleteItem(id);
            console.log('delete item: ',result)
            result
                ? res.status(200).send(`Successfully removed a item with ObjectId(${id})`)
                : res.status(400).send(`Failed to remove a item with ObjectId(${id})`)
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error');
        }
    };

}
import { Request, Response } from 'express';
import { orderService } from '../services/orderServices';
import { logger } from '../util/logger';
import { form, transporter } from '../util/middleware';

export class orderController {
    constructor(
        private orderService: orderService
    ) {

    }
    getOrder = async(req: Request, res: Response) => {
        try {
            const user_id = req.user?.id;
            const order = await this.orderService.getOrder(user_id)
            order
            ? res.status(200).json(order)
            : res.status(400).json('fail')
        } catch (err) {
            logger.error(err)
            res.status(500).send('Internal Server Error')
        }


    }

    getOrderLatest = async (req: Request, res: Response) => {
        try {
            const user_id = req.user?.id;
            console.log('oC, userID', user_id)
            const order = await this.orderService.getOrderLatest(user_id)
            console.log('check show what data', order)
            order
            ? res.status(200).json(order)
            : res.status(400).json('fail')
        } catch (err) {
            logger.error(err)
            res.status(500).send('Internal Server Error')
        }
    }

    getOrderAdmin = async (req: Request, res: Response) => {
        try {
            const order = await this.orderService.getOrderAdmin()
            order
            ? res.status(200).json(order)
            : res.status(400).json('fail')
        } catch (err) {
            logger.error(err);
            res.status(500).send('Internal Server Error')
        }
    }

    getOrderPayment = async (req: Request, res: Response) => {
        try {
            const order_id = req.params.id
            const order = await this.orderService.getOrderPayment(order_id)
            order
            ? res.status(200).json(order)
            : res.status(400).json('fail')

        } catch (err) {
            logger.error(err);
            res.status(500).send('Internal Server Error')
        }
    }

    postOrder = async(req: Request, res: Response) => {
        try {
            const user_id = req.user?.id;
            let email = req.body.email.trim();
            let phoneNumber = req.body.phoneNumber;
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let address1 = req.body.address1;
            let address2 = req.body.address2;
            let city = req.body.city;
            let country = req.body.country;
            let postalCode = req.body.postalCode;
            let state = req.body.state;
            let carts = req.body.carts;
            let shippingMethod = req.body.shippingMethod;
            let displayMoney = req.body.displayMoney;
            let status = "Unsettled";
            // console.log('postOrder id', user_id)
            // console.log('postOrder body', req.body);
            // console.log('postOrder cart: ', req.body.carts)
            const order = await this.orderService.postOrder(user_id, email, phoneNumber, firstName, lastName, address1, address2, city, country, postalCode, state, carts, displayMoney, shippingMethod, status)
            transporter.sendMail({
                to: email,
                subject: `Placed an order in ai.belief.com with order ID ${order.insertedId.toString()}`,
                from: process.env.NODEMAILER_EMAIL,
                text: `You have placed an order in ai.belief.com! Please settle the payment with the following link! ${process.env.FRONTEND_URL}/payment/${order.insertedId}`
            })
            order
                // ? res.status(200).send(`Successfully placed order to order with ${order.insertedId}`)
                ? res.status(200).json(order)
                : res.status(400).send('Failed to place the order to order')
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error')
            }
    }

    patchPayOrder = async (req: Request, res: Response) => {
        form.parse(req, async (err, fields, files) => {
            try {
                let order_id = req.params.id
                console.log('patch photo: ', files)
                let payment_verify_photo = files.payment_verify_photo != null && !Array.isArray(files.payment_verify_photo) ? files.payment_verify_photo.newFilename : null;
                const order = await this.orderService.patchPayOrder(order_id, payment_verify_photo)
                order
                    ? res.status(200).send(`Successfully make the payment request, Please wait for response`)
                    : res.status(400).send('Failed to make a payment request')
            } catch (err) {
                logger.error(err);
                res.status(500).json('Internal Server Error')
            }
        })

    }

    patchOrderStatus = async (req: Request, res: Response) => {
        try {
            let order_id = req.params.id
            let status = req.body.status
            const email = await this.orderService.getOrderPayment(order_id)
            const order = await this.orderService.patchOrderStatus(order_id, status)
            transporter.sendMail({
                to: email[0].email,
                subject: `Updated an order in ai.belief.com with order ID ${order_id}`,
                from: process.env.NODEMAILER_EMAIL,
                text: `We have update an order in ai.belief.com! Please check the updated status with the following link! ${process.env.FRONTEND_URL}/payment/${order_id}`
            })
            order
                ? res.status(200).send(`Successfully update the order status with ObjectId(${order_id})`)
                : res.status(400).send('Failed to make a payment request');
        } catch (err) {
            logger.error(err);
            res.status(500).json('Internal Server Error')
        }
    }


}
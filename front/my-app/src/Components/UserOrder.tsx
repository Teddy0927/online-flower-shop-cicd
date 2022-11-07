import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { LoadingState } from './model';
import Skeleton from 'react-loading-skeleton';
import { loadOrder } from '../order/action';
import moment from 'moment';

export default function UserOrder() {
    const dispatch = useAppDispatch();
    const orderLoaded = useAppSelector(state => state.order.loading);
    const orders = useAppSelector(state => state.order.orders);

    useEffect(() => {
        dispatch(loadOrder());
    }, [dispatch])
    return (
        <div className="container-fluid">
            <h1>User Order</h1>
            {
                    orderLoaded !== LoadingState.Loaded
                        ? <Skeleton count={5} />
                        : orders.map((order, index) => (
                            <div key={index}>{
                                !orders
                                    ? <Skeleton />
                                    : <><div className="row order">
                                        <div className="col-12"><h3>Order ID: {order._id}</h3></div>
                                        <div className="col-12"><h3>Order Date: {moment(order.created_at).format('MMM DD YYYY')}</h3></div>
                                        <div className="col-12"><h3>Order Address: {order.address1} {order.address2}</h3></div>
                                        <div className="col-12"><h3>{order.city} {order.country}</h3></div>
                                        <div className="col-12"><h3>Contact Number: {order.phoneNumber}</h3></div>
                                        <div className="col-12"><h3>Payment method: PayMe</h3></div>
                                        <div className="col-12"><h3>Total price: HK${order.displayMoney}</h3></div>
                                        <div className="col-12"><h3>Order Status: {order.status}</h3></div>
                                        {/* <button onClick={() => navigate('/')}className="col-1">More</button> */}
                                        <div className="col-12"><h1>Payment Confirmation photo</h1></div>
                                        <div className="col-12"><img className="paymentPhoto" src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${order.payment_verify_photo}`} alt={order._id} /></div>
                                    </div>
                                    </>
                            }
                            </div>
                        ))
                }

            
            <div>

            </div>
        </div>
    )
}
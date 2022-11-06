import React, { useEffect } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import { editOrderStatus, loadOrderAdmin } from '../order/action';
import { useAppDispatch, useAppSelector } from '../store';
import { LoadingState } from './model';
import { useNavigate } from 'react-router-dom';

export default function AdminOrder() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const orders = useAppSelector(state => state.order.orders)
    const orderLoaded = useAppSelector(state => state.order.loading)

    useEffect(() => {
        dispatch(loadOrderAdmin())
    }, [dispatch])
    return (
        <div>
            <h1>Admin Order</h1>
            <div className="container-fluid">
                <div className="row order">
                    <div className="col-1">ID</div>
                    <div className="col-2">Time</div>
                    <div className="col-2">Address</div>
                    <div className="col-2">Phone</div>
                    <div className="col-1">Method</div>
                    <div className="col-1">Amount</div>
                    <div className="col-1">Status</div>
                    <div className="col-1">Action</div>
                    <div className="col-1">Details</div>
                </div>
                {
                    orderLoaded !== LoadingState.Loaded
                        ? <Skeleton count={5} />
                        : orders.map((order, index) => (
                            <div key={index}>{
                                !orders
                                    ? <Skeleton />
                                    : <><div className="row order">
                                        <div className="col-1">{index + 1}</div>
                                        <div className="col-2">{moment(order.created_at).format('MMM DD YYYY')}</div>
                                        <div className="col-2">{order.city} {order.country}</div>
                                        <div className="col-2">{order.phoneNumber}</div>
                                        <div className="col-1">PayMe</div>
                                        <div className="col-1">HK${order.displayMoney}</div>
                                        <div className="col-1">{order.status}</div>
                                        <select className="col-1" onChange={e => dispatch(editOrderStatus(order._id, e.currentTarget.value))}>
                                            <option>Unsettled</option>
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Delivered</option>
                                            <option>Canceled</option>
                                        </select>
                                        <button onClick={() => navigate('/')}className="col-1">More</button>
                                        <div className="col-4">
                                            Payment Confirmation photo
                                            <img className="paymentPhoto" src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${order.payment_verify_photo}`} alt={order._id} />
                                        </div>
                                    </div>
                                    </>
                            }
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
import React, { useEffect} from 'react';
import axios from 'axios';
import { loadOrderPayment} from '../order/action';
import { useAppDispatch, useAppSelector } from '../store';
import { LoadingState } from '../Components/model';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Payment() {
    const { handleSubmit, register } = useForm();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const orderLoaded = useAppSelector(state => state.order.loading)
    const orders = useAppSelector(state => state.order.orders)

    useEffect(() => {
        dispatch(loadOrderPayment(id))
    }, [dispatch, id])

    return (
        <div className="container-fluid">
            <h1>Payment</h1>
            <img className="paymeQRCode" alt="PayMe QR Code" src={require('../IMG_2207.JPG')} />
            <div className="row paymentGuide">
                <h3>Paying with PayMe</h3>
                <div className="col-12 col-md-4">1. Open the PayMe app.</div>
                <div className="col-12 col-md-4">2. Scan the PayCode to authorize payment.</div>
                <div className="col-12 col-md-4">3. Complete payment in the app and click the Paid! button.</div>
            </div>


            {
                orderLoaded !== LoadingState.Loaded
                    ? <Skeleton count={10} />
                    : orders.map((order, index) => (
                        <div key={index}>{
                            !orders
                                ? <Skeleton />
                                : <>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3>Order number: {order._id}</h3>
                                            <h4>Status: {order.status} </h4>
                                            <div className="container">
                                            {
                                                order.carts.map((cart, index) => (
                                                    <div className="row" key={index}>
                                                        <div className="col-4 col-md-4">
                                                            <NavLink to={`/item/${cart._id}`}>
                                                                <img className="cartItemImage" src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${cart.item_photo}`} alt={cart.item_alt} />
                                                            </NavLink>
                                                        </div>
                                                        <div className="col-6 col-md-6 cartText">
                                                            <h5>{cart.item_name}</h5>
                                                            <p>{cart.item_alt}</p>
                                                            <p>Style: {cart.item_style}</p>
                                                        </div>
                                                        <div className="col-2 col-md-2">
                                                            <div className="cartPrice">HK${cart.item_price}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            }</div>
                                            <h3>Total: HK${order.displayMoney}</h3>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit(async data => {
                                        const formData = new FormData();
                                        formData.append('payment_verify_photo', data.payment_verify_photo[0]);
                                        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/payOrder/${order._id}`,
                                        formData)
                                        if (res.status === 200) {
                                            alert('Sent request customer service.')
                                            dispatch(loadOrderPayment(id))
                                        } else if (res.status === 400) {
                                            alert('Request not success. Please try again')
                                        } else if (res.status === 500) {
                                            alert('There is something wrong with the server. Please try again!')
                                        }
                                    })}>
                                        <label className="inputLabel">Payment verifying photo</label><br/>
                                        <input className="settingInput" accept=".png, .jpg, .jpeg" type="file" {...register('payment_verify_photo', {required: true})} /><br/>
                                        <input className="checkoutButton" value="Paid!" type="submit" />
                                    </form>
                                </>
                        }
                        </div>
                    )
                    )
            }




        </div>
    )
}

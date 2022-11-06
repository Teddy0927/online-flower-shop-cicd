import React, { useEffect, useState } from 'react';
import { LoadingState } from '../Components/model';
import { clearCart, fetchDecreaseQuantity, fetchIncreaseQuantity, fetchRemoveFromCart, loadCart } from '../cart/action';
import { loadOneItem } from '../items/action';
import Skeleton from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from '../store';
import { NavLink } from 'react-router-dom';

export default function Cart() {
    const dispatch = useAppDispatch();
    const cartLoaded = useAppSelector(state => state.cart.loading);
    const carts = useAppSelector(state => state.cart.carts);
    const items = useAppSelector(state => state.items.items);
    const [displayMoney, SetDisplayMoney] = useState('');
    async function calculateDisplayMoney() {
        let total = 0
        let subtotal = 0;
        for (const cart of carts) {
            subtotal = cart.item_price * cart.quantity
            total = total + subtotal
        }
        SetDisplayMoney(`${total}`);
    }
    useEffect(() => {
        calculateDisplayMoney()
    })

    return (
        <div className="container cart">
            <div className="cartRemoveButton" onClick={() => {dispatch(clearCart())}}>Clear Shopping Cart</div>
            <form>
            {
                cartLoaded !== LoadingState.Loaded
                ? <Skeleton count={10} />
                : carts.map((cart, index) => (
                    <div key={index}>{
                        !carts
                            ? <Skeleton/>
                            : <>
                                <div className="row item">
                                    <div className="col-4 col-md-4">
                                        <NavLink to={`/item/${cart._id}`}>
                                            <img className="cartItemImage" src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${cart.item_photo}`} alt={cart.item_alt}/>
                                        </NavLink>
                                    </div>
                                    <div className="col-6 col-md-6 cartText">
                                        <h5>{cart.item_name}</h5>
                                        <p>{cart.item_alt}</p>
                                        <p>Style: {cart.item_style}</p>
                                        <div className="quantityControl">
                                            <div className="btnMinus" onClick={() => {dispatch(fetchDecreaseQuantity(cart._id))}}>-</div>
                                            <input className="quantityInput" type="text" value={cart.quantity} readOnly/>
                                            <div className="btnPlus" onClick={() => {dispatch(fetchIncreaseQuantity(cart._id))}}>+</div>

                                        </div>
                                    </div>
                                    <div className="col-2 col-md-2">
                                        <div className="cartRemoveButton" onClick={() => {dispatch(fetchRemoveFromCart(cart._id))}}>Remove</div>
                                        <div className="cartPrice">HK${cart.item_price}</div>
                                    </div>
                                </div>
                            </>
                    }</div>
                ))

            }
            <div className="checkoutSession">
                <h1>Subtotal: HK${displayMoney}</h1>
                <h1>Shipping: HK$0</h1>
                <h1>Total: HK${displayMoney}</h1>
            </div>
            

            <div className="paymentButton"><NavLink className="navLinkItem" to='/CheckOut'>Continue to check out</NavLink></div>
            </form>
        </div>
    )
}
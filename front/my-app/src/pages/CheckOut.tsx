import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { LoadingState } from '../Components/model';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearCart } from '../cart/action';


export default function CheckOut() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [state, setState] = useState('');
    const [checkoutError, setCheckoutError] = useState('');
    const cartLoaded = useAppSelector(state => state.cart.loading);
    const carts = useAppSelector(state => state.cart.carts);
    const [displayMoney, setDisplayMoney] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');

    async function calculateDisplayMoney() {
        let total = 0
        let subtotal = 0;
        for (const cart of carts) {
            subtotal = cart.item_price * cart.quantity
            total = total + subtotal
        }
        // console.log(total)
        setDisplayMoney(`${total}`);
    }
    useEffect(() => {
        calculateDisplayMoney()
    })

    // const carts = state.carts.
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <h1>Contact Information</h1>
                    <form onSubmit={async e => {
                        e.preventDefault();
                        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order`, {
                            email,
                            phoneNumber,
                            firstName,
                            lastName,
                            address1,
                            address2,
                            city,
                            country,
                            postalCode,
                            state,
                            carts,
                            displayMoney,
                            shippingMethod,
                        })

                        if (res.status === 200) {
                            alert('Order placed, please proceed to payment')
                            navigate(`/payment/${res.data.insertedId}`);
                        } else if (res.status === 400) {
                            setCheckoutError('Please try again')
                        } else if (res.status === 404) {
                            setCheckoutError('Not found')
                        }
                    }}>
                        { checkoutError }
                        <label className="label">Email</label><br />
                        <input className="input" type='text' placeholder='e.g. something@example.com' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email} onChange={e => setEmail(e.currentTarget.value)} required/><br />
                        <label className="label">Phone Number</label><br />
                        <input className="input" type='text' placeholder='e.g. +852 XXXX XXXX' value={phoneNumber} onChange={e => setPhoneNumber(e.currentTarget.value)} required/><br />
                        <label className="label">First Name</label><br />
                        <input className="input" type='text' placeholder='e.g. Peter' value={firstName} onChange={e => setFirstName(e.currentTarget.value)} required/><br />
                        <label className="label">Last Name</label><br />
                        <input className="input" type='text' placeholder='e.g. Wong' value={lastName} onChange={e => setLastName(e.currentTarget.value)} required/><br />
                        <label className="label">Address 1</label><br />
                        <input className="input" type='text' value={address1} onChange={e => setAddress1(e.currentTarget.value)} required/><br />
                        <label className="label">Address 2</label><br />
                        <input className="input" type='text' value={address2} onChange={e => setAddress2(e.currentTarget.value)} required/><br />
                        <label className="label">City</label><br />
                        <input className="input" type='text' value={city} onChange={e => setCity(e.currentTarget.value)} required/><br />
                        <label className="label">Country</label><br />
                        <input className="input" type='text' value={country} onChange={e => setCountry(e.currentTarget.value)} required/> <br />
                        <label className="label">Postal Code</label><br />
                        <input className="input" type='text' value={postalCode} onChange={e => setPostalCode(e.currentTarget.value)} /><br />
                        <label className="label">State</label><br />
                        <input className="input" type='text' value={state} onChange={e => setState(e.currentTarget.value)} /><br />
                        <label className="label">Shipping Method</label><br />
                        <select className="input" value={shippingMethod} onChange={e => setShippingMethod(e.currentTarget.value)} required>
                            <option value="localShipping">Local Shipping</option>
                            <option value="worldwideShipping" disabled>Worldwide Shipping Coming Soon!</option>
                        </select><br />
                        <label className="label">Total price</label><br />
                        <input className="input" value={displayMoney} readOnly/>< br />
                        <button className="checkoutButton"><NavLink className="navLinkItem"to='/cart'>Back to cart</NavLink></button>
                        <input className="checkoutButton" value="Check out" type='submit' />
                    </form>
                </div>
                <div className="col-12 col-lg-6">
                    <h1>Shopping cart summary</h1>
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
                                                <img className="cartItemImage"src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${cart.item_photo}`} alt={cart.item_alt}/>
                                            </NavLink>
                                        </div>
                                        <div className="col-6 col-md-6 cartText">
                                            <h5>{cart.item_name}</h5>
                                            <p>{cart.item_alt}</p>
                                            <p>Style: {cart.item_style}</p>
                                            <p>Quantity: {cart.quantity}</p>
                                        </div>
                                        <div className="col-2 col-md-2">
                                            <div className="cartPrice">HK${cart.item_price}</div>
                                        </div>
                                    </div>
                                    {/* {item.name} {item.price} {item.style} {item.alt} */}
                                </>
                        }</div>
                    ))

                }
                <div className="checkoutSession">
                    <h1>Subtotal: HK${displayMoney}</h1>
                    <h1>Shipping: HK$0</h1>
                    <h1>Total: HK${displayMoney}</h1>
                </div>
                </div>
            </div>
        </div>
    )
}
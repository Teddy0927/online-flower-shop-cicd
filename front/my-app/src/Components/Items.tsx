import React from 'react';
import { fetchAddToCart } from '../cart/action';
import { useAppDispatch } from '../store';
import { Item } from './model';

export default function SellingItems(props: {
    item: Item
}) {
    const item = props.item;
    const dispatch = useAppDispatch();

    return (
        <div className="col-md-3 col-6 d-flex justify-content-center">
            <div>
                <img className="item" src={ `${process.env.REACT_APP_BACKEND_URL}/uploads/${item.item_photo}` } alt={ item.item_alt } />
                <p> { item.item_name } <br /> { item.item_style } <br /> { item.item_price } <br /></p>
                <button onClick={() => dispatch(fetchAddToCart(item._id, item.item_alt, item.item_name, item.item_style, item.item_price, item.item_category, item.item_photo))}>Add To Cart</button>
            </div>
        </div>
    )
}
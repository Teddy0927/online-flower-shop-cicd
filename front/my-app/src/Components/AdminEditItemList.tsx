import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { checkResponse } from '../auth/action';
import { loadItems } from '../items/action';
import { useAppDispatch } from '../store';
import { Item } from './model';

export default function AdminEditItemList(props: {
    item: Item
}) {
    const item = props.item;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function removeItem(_id: string) {
        const res = await axios.delete(`/item/${_id}`)
        dispatch(checkResponse(res))
        if (res.status === 200) {
            dispatch(loadItems());
            alert(`Successfully removed item with ObjectId(${_id})`)
        } else if (res.status === 400) {
            alert(`Failed to remove item with ObjectId(${_id})`)
        } else if (res.status === 500) {
            alert('There is something wrong with the server. Please try again later')
        } else if (res.status === 401) {
            alert('Unauthorize to edit item')
        }
    }


    return (
        <div className="col-md-3 col-6 d-flex justify-content-center">
            <div>
                <img className="item" src={ `${process.env.REACT_APP_BACKEND_URL}/uploads/${item.item_photo}` } alt={ item.item_alt } />
                <p> { item.item_name } <br /> { item.item_style } <br /> HK$ { item.item_price } <br /></p>
                <button onClick={() => navigate(`/editItem/${item._id}`)}>Edit item</button>
                <button onClick={() => removeItem(item._id)}>Remove item</button> 
            </div>
        </div>
    )
}
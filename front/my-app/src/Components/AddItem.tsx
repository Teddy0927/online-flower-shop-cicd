import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { checkResponse } from '../auth/action';
import { useAppDispatch } from '../store';

export default function AddItem() {
    const dispatch = useAppDispatch();
    const { handleSubmit, register } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    return (
        <div>
            <form onSubmit={handleSubmit(async data => {
                const formData = new FormData();
                formData.append('item_alt', data.item_alt);
                formData.append('item_name', data.item_name);
                formData.append('item_style', data.item_style);
                formData.append('item_price', data.item_price);
                formData.append('item_category', data.item_category);
                formData.append('item_photo', data.item_photo[0]);
                const res = await axios.post(`/item`, 
                    formData
                )
                
                dispatch(checkResponse(res));

                if (res.status === 200) {
                    alert('Successfully added item')
                    navigate('/admin')
                } else if (res.status === 400) {
                    setError('Failed to added item')
                    alert('Failed to add item')
                } else if (res.status === 500) {
                    setError('Something wrong with the server')
                    alert('There is something wrong with the server. Please try again later')
                } else if (res.status === 401) {
                    alert('Unauthorize to add item')
                }

            })}>
                <h1>{error}</h1>
                <label className="label">ALT</label><br />
                <input className="input" {...register('item_alt', {required: true})}/> <br />
                <label className="label">Item Name</label><br />
                <input className="input" {...register('item_name', {required: true})}/> <br />
                <label className="label">Style</label><br />
                <input className="input" {...register('item_style', {required: true})}/> <br />
                <label className="label">Price</label><br />
                <input className="input" {...register('item_price', {required: true})}/> <br />
                <label className="label">Category</label><br />
                <select className="input" {...register('item_category', {required: true})}>
                    <option value="1">Preserved Flower Bouquet</option>
                    <option value="2">Glass Done</option>
                    <option value="3">Flower Boxes</option>
                    <option value="4">Bluetooth Speaker</option>
                    <option value="5">Fantasy</option>
                    <option value="6">Rose Bear</option>
                </select><br />
                <label className="label">Photo</label><br />
                <input className="input" accept=".png, .jpg, .jpeg" type="file" {...register('item_photo', {required: true})}/><br />
                <input className="settingButton" value="Add item" type="submit"/>
            </form>
        </div>
    )
}
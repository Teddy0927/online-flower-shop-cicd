import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { checkResponse } from '../auth/action';
import { Item } from '../Components/model';
import { useAppDispatch } from '../store';

export default function EditItem() {
    const { id } = useParams();

    const [item, setItem] = useState<Item>({
        item_category: "",
        _id: "",
        item_photo: "",
        item_alt: "",
        item_name: "",
        item_style: "",
        item_price: 0
    });

    const { handleSubmit, register , reset} = useForm({
        defaultValues: item
    });
    useEffect(() => {
        if (id) {
            getItemInfo(id)
        } 
    }, [reset, id])

    async function getItemInfo(id: string) {
        const res = await axios.get(`/item/${id}`)
        setItem(res.data[0])
        reset(res.data[0])
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    return (
        <div>
            <form onSubmit={handleSubmit(async data => {
                const formData = new FormData();
                formData.append('item_alt', data.item_alt);
                formData.append('item_name', data.item_name);
                formData.append('item_style', data.item_style);
                formData.append('item_price', data.item_price.toString());
                formData.append('item_category', data.item_category);
                formData.append('item_photo', data.item_photo[0]);
                console.log(data.item_photo);
                const res = await axios.patch(`/item/${id}`,
                    formData
                )
                dispatch(checkResponse(res));
                console.log('submit jor')
                if (res.status === 200) {
                    alert('Successfully edited item!')
                    navigate('/admin');
                } else if (res.status === 304) {
                    setError('Please try again!')
                } else if (res.status === 404) {
                    setError('Not found')
                }

            })}>
                <h1>{error}</h1>
                <label className="label">ALT</label><br />
                <input className="input" {...register('item_alt', { required: false })} /> <br />
                <label className="label">Item Name</label><br />
                <input className="input" {...register('item_name', { required: false })} /> <br />
                <label className="label">Style</label><br />
                <input className="input" {...register('item_style', { required: false })} /> <br />
                <label className="label">Price</label><br />
                <input className="input" {...register('item_price', { required: false })} /> <br />
                <label className="label">Category</label><br />
                <select className="input" {...register('item_category', { required: false })}>
                    <option value="1">Preserved Flower Bouquet</option>
                    <option value="2">Glass Done</option>
                    <option value="3">Flower Boxes</option>
                    <option value="4">Bluetooth Speaker</option>
                    <option value="5">Fantasy</option>
                    <option value="6">Rose Bear</option>
                </select><br />
                <label className="label">Photo</label><br />
                <input className="input" accept=".png, .jpg, .jpeg" type="file" {...register('item_photo', { required: false })} /><br />
                <input className="settingButton" value="Edit item" type="submit" />
            </form>
        </div>
    )
}
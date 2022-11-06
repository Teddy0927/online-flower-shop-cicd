import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkResponse } from '../auth/action';
import { useAppDispatch, useAppSelector } from '../store';
import AdminEditItemList from './AdminEditItemList';

export default function EditItem() {
    const dispatch = useAppDispatch();
    const itemsLoaded = useAppSelector(state => state.items.loading)
    const items = useAppSelector(state => state.items.items)

    return (
        <div>
            <h1>Edit item</h1>
            <div className="container-fluid">
                <div className="row">
                    {items.map((item, index) => (
                        <AdminEditItemList item={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

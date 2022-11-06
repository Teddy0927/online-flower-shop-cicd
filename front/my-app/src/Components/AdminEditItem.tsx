import React from 'react';
import { useAppSelector } from '../store';
import AdminEditItemList from './AdminEditItemList';

export default function EditItem() {
    // const itemsLoaded = useAppSelector(state => state.items.loading)
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

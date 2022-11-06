import React, { useState } from 'react';
import { useAppDispatch } from '../store';
import AddItem from './AddItem';
import AdminEditItem from './AdminEditItem';

export default function AdminItem() {
    const dispatch = useAppDispatch()
    const [showAdminItemOption, setShowAdminItemOption] = useState('')
    return (
        <div className="container-fluid">
            <h1>Admin Item</h1>
            <ul className="menu row">
                <li className="col-sm menuItem" onClick={() => setShowAdminItemOption('Add')}>Add item</li>
                <li className="col-sm menuItem" onClick={() => setShowAdminItemOption('Edit')}>Edit/Delete item</li>
            </ul>
            { showAdminItemOption === 'Add' && <AddItem />}
            { showAdminItemOption === 'Edit' && <AdminEditItem />}            
        </div >
    )
}
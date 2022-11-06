import React, { useEffect } from 'react';
import { loadItems } from '../items/action';
import { useAppDispatch, useAppSelector } from '../store';
import SellingItems from './Items';


export default function ItemJai() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.items.items);

    useEffect(() => {
        dispatch(loadItems())
    }, [dispatch])

    return (
        <div>
            {
                items.map((flower, index) => (
                    <SellingItems item={flower} key={index} />
                ))
            }
        </div>
    )
}
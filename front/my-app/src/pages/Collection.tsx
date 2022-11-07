import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SellingItems from '../Components/Items';

export default function Collection() {
    const { id } = useParams()
    const [item, setItem] = useState([])



    useEffect(() => {
    async function getItems() {
        const res = await axios.get(`/collection/${id}`)
        setItem(res.data)
        console.log('here')
    }   
    getItems()
        
    }, [setItem, id]);
    
    return (
        <div className="container p-3">
            <h2><span>Selected category</span></h2>
            <div className="row d-flex flex-wrap justify-content-around">
            {
                item.map((flower, index) => (
                    <SellingItems item={flower} key={index} />
                ))
            }
            </div>
        </div>
    )
}
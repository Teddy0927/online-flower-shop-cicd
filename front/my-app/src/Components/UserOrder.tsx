import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store';
import { LoadingState } from './model';
import Skeleton from 'react-loading-skeleton';
import { loadOrder } from '../order/action';

export default function UserOrder() {
    const dispatch = useAppDispatch();
    const orderLoaded = useAppSelector(state => state.order.loading);
    const orders = useAppSelector(state => state.order.orders);

    useEffect(() => {
        dispatch(loadOrder());
    }, [dispatch])
    return (
        <div className="container-fluid">
            User Order
            {
                orderLoaded != LoadingState.Loaded
                    ? <Skeleton count={10} />
                    : orders.map((order, index) => (
                        <div key={index}>{
                            !orders
                                ? <Skeleton />
                                : <>
                                    <div className="row">
                                        <div className="col-8">
                                            1
                                        </div>
                                        <div className="col-4">
                                            2
                                        </div>
                                    </div>
                                </>
                        }

                        </div>
                    )
                    )
            }

            
            <div>

            </div>
        </div>
    )
}
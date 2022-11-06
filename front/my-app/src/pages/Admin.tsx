import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import { loggedOut } from '../auth/action';
import AdminItem from '../Components/AdminItem';
import AdminOrder from '../Components/AdminOrder';
import AdminSetting from '../Components/AdminSetting';
import { loadItems } from '../items/action';
import { useAppDispatch } from '../store';

export default function Admin() {
    const dispatch = useAppDispatch();
    const [showAdminOption, setShowAdminOption] = useState('');
    
    useEffect(() => {
        dispatch(loadItems());
    }, [dispatch])

    return (
        <div>
            <h1 className="userHeading">Admin</h1>
            <div className="user container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <section>
                            <div className="d-block d-md-none userSectionSlider">
                                <Splide options={{arrows: false, pagination: false, gap: 5, padding: {left: 20, right: 20}, fixedWidth: '100px', focus: 'center'}}>
                                    <SplideSlide onClick={() => setShowAdminOption('Admin')}>Admin</SplideSlide>
                                    <SplideSlide onClick={() => setShowAdminOption('AdminItem')}>Item</SplideSlide>
                                    <SplideSlide onClick={() => setShowAdminOption('AdminOrder')}>Order</SplideSlide>
                                    {/* <SplideSlide onClick={() => setShowAdminOption('AdminSetting')}>Settings</SplideSlide> */}
                                    <SplideSlide onClick={() => dispatch(loggedOut())}>Log out</SplideSlide>
                                </Splide>
                            </div>
                            <div className="d-none d-md-block">
                                <div className="userSectionItem" onClick={() => setShowAdminOption('Admin')}>Admin</div>
                                <div className="userSectionItem" onClick={() => setShowAdminOption('AdminItem')}>Item</div>
                                <div className="userSectionItem" onClick={() => setShowAdminOption('AdminOrder')}>Order</div>
                                {/* <div className="userSectionItem" onClick={() => setShowAdminOption('AdminSetting')}>Setting</div> */}
                                <div className="userSectionItem" onClick={() => dispatch(loggedOut())}>Log out</div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-md-9">
                        { showAdminOption === 'Admin' && <h1>Please select your request</h1>}
                        { showAdminOption === 'AdminItem' && <AdminItem />}
                        { showAdminOption === 'AdminOrder' && <AdminOrder />}
                        {/* { showAdminOption === 'AdminSetting' && <AdminSetting />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
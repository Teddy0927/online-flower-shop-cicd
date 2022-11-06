import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useState } from 'react';
import { loggedOut } from '../auth/action';
import UserOrder from '../Components/UserOrder';
import UserSetting from '../Components/UserSetting';
import { useAppDispatch } from '../store';

export default function User() {
    const [ShowUserOption, setShowUserOption] = useState('User');
    const dispatch = useAppDispatch();
    return (
        <div>
            <h1 className="userHeading">Account</h1>
            <div className="user container-fluid">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <section>
                            <div className="d-block d-md-none userSectionSlider">
                                <Splide options={{arrows: false, pagination: false, gap: 5, padding: {left: 20, right: 20}, fixedWidth: '100px', focus: 'center'}}>
                                    <SplideSlide onClick={() => setShowUserOption('User')}>User</SplideSlide>
                                    <SplideSlide onClick={() => setShowUserOption('UserOrder')}>Order</SplideSlide>
                                    <SplideSlide onClick={() => setShowUserOption('UserSetting')}>Settings</SplideSlide>
                                    <SplideSlide onClick={() => dispatch(loggedOut())}>Log out</SplideSlide>
                                </Splide>
                            </div>
                            <div className="d-none d-md-block">
                                <div className="userSectionItem" onClick={() => setShowUserOption('User')}>User</div>
                                <div className="userSectionItem" onClick={() => setShowUserOption('UserOrder')}>Order</div>
                                <div className="userSectionItem" onClick={() => setShowUserOption('UserSetting')}>Setting</div>
                                <div className="userSectionItem" onClick={() => dispatch(loggedOut())}>Log out</div>
                            </div>
                        </section>
                    </div>
                    <div className="col-12 col-md-8">
                        { ShowUserOption === 'User' && <h1>Please select your request</h1>} 
                        { ShowUserOption === 'UserOrder' && <UserOrder />}
                        { ShowUserOption === 'UserSetting' && <UserSetting />}
                    </div>
                </div>
            </div>
        </div>
    )
}
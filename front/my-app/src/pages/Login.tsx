import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../auth/action';
import { useAppDispatch } from '../store';

export default function Login() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    

    return (
        <div>
            <div className="container login">
                <h1>Log In</h1>
                <div className="justify-content-between d-flex flex-row">
                    <h6>Join via Email</h6>
                    <h6>Use Mobile</h6>
                </div>
                <form onSubmit={async e => {
                    e.preventDefault();

                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({email, password})
                    });
                    if (res.status === 200) {
                        const user = await res.json();
                        // dispatch(loggedIn(user.email, user.username, user.token));
                        dispatch(login(user.token));
                        if (user.role === 'admin') {
                            navigate('/admin')
                        } else {
                        navigate('/');
                        }
                    } else if (res.status === 400) {
                        setError('Wrong Password');
                    } else if (res.status === 404) {
                        setError('Not found')
                    }
                }}>
                    { error }
                    <input className="loginInput" type='text' placeholder='Email*' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email} onChange={e => setEmail(e.currentTarget.value)}></input>
                    <input className="loginInput" type='password' placeholder='Password*' value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
                    <input className="loginButton" value='Log In' type='submit'></input>
                </form>
                <h6>New to ai.belief?</h6>
                <NavLink className="navLinkItem login" to="/register">Join ai.belief for FREE Now!!</NavLink>
            </div>
        </div>
    )
}
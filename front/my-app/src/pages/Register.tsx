import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
const { handleSubmit, register } = useForm();
const [error, setError] = useState('');
const navigate = useNavigate();

    return (
        <div>
            <div className="container register">
                <h1>Create Your Account</h1>
                <h6>Join ai.belief Now</h6>
                <form onSubmit={handleSubmit(async data => {
                    const formData = new FormData();
                    formData.append('email', data.email);
                    formData.append('username', data.username);
                    formData.append('password', data.password);
                    formData.append('contact_number', data.contact_number);
                    formData.append('profile_picture', data.profile_picture[0]);
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                        method: 'POST',
                        credentials: 'include',
                        body: formData
                    });
                    if (res.status === 200) {
                        navigate('/login');
                    } else if (res.status === 400) {
                        setError('Please try again');
                    } else if (res.status === 404) {
                        setError('Not found')
                    }
                })}>
                    { error }                
                    <input className="registerInput" placeholder="Email*" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" {...register('email', {required: true})}></input><br></br>
                    <input className="registerInput" placeholder="Username*" {...register('username', {required: true})}></input><br></br>
                    <input className="registerInput" placeholder="Password*" type='password' {...register('password', {required: true})}></input><br></br>
                    <input className="registerInput" placeholder="Contact Number" {...register('contact_number', {required: false})}></input><br></br>
                    <input className="registerInput" accept=".png, .jpg, .jpeg" type='file' {...register('profile_picture', {required: false})}></input><br></br>
                    <input className="registerButton" value="Sign up" type='submit' />
                </form>
                <NavLink className="navLinkItem register" to="/login">Already a member?</NavLink>
            </div>
        </div>
    )
}
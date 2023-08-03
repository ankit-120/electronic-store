import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login, register } from '../apis';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../facilities/commonSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedin } = useSelector((state) => state.common);

    const [isClick, setIsClick] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    console.log("log")

    const handleSignup = async () => {
        try {
            const { data } = await axios.post(register(), formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            toast.success('Registered successfully');
            navigate('/')
        } catch (error) {
            toast.error(error.response.data.message)
            setFormData({
                name: '',
                email: '',
                password: ''
            })
        }
    }

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(login(), {
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            toast.success(data.message);
            dispatch(setIsAuthenticated())
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message);
            setFormData({
                name: '',
                email: '',
                password: ''
            })
        }
    }

    useEffect(() => {
        if (isLoggedin) navigate('/')
    })


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-slate-100 rounded shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">
                {isClick ? 'Login' : 'Sign Up'}
            </h2>
            <div className={`mb-6 ${isClick ? 'hidden' : 'block'}`}>
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
            <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 mb-6 w-full"
                onClick={() => !isClick ? handleSignup() : handleLogin()}>
                {isClick ? 'Login' : 'Signup'}
            </button>
            <div className="block text-gray-800 text-md font-semibold mb-2">
                {!isClick ? 'Already Signed up?' : 'New User?'}
                <span
                    className='cursor-pointer hover:text-blue-500'
                    onClick={() => setIsClick(!isClick)}>
                    {!isClick ? 'Login' : 'Sign Up'}
                </span>
            </div>
        </div>
    )
}

export default Login
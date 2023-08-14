import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { login, register } from '../apis';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setIsAdmin } from '../facilities/commonSlice';
import { BiSolidCamera } from 'react-icons/bi'
import { MoonLoader } from 'react-spinners';
import { setUserInfo } from '../facilities/userSlice';
import './Login.module.css'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.common);

    const [isClick, setIsClick] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [profile, setProfile] = useState({
        url: '/images/default_profile.png',
        avatar: ''
    })

    const [loading, setLoading] = useState();

    const handleProfile = async (e) => {
        setLoading(true)
        setProfile({ url: URL.createObjectURL(e.target.files[0]), avatar: e.target.files[0] })
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false)
    }

    const handleSignup = async () => {
        console.log(formData);
        console.log(profile)
        try {
            const form_data = new FormData();
            form_data.append('json', JSON.stringify(formData));
            form_data.append('avatar', profile.avatar);
            const { data } = await axios.post(register(), form_data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            toast.success(data.message);
            dispatch(setUserInfo(data.user));
            dispatch(setIsAuthenticated(true))
            dispatch(setIsAdmin(false))
            navigate('/')
        } catch (error) {
            toast.error(error.response.data.message)
            setFormData({
                name: '',
                email: '',
                password: ''
            })
            setProfile({
                url: '/images/default_profile.png',
                avatar: ''
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
            dispatch(setIsAuthenticated(true))
            dispatch(setUserInfo(data.user));
            if (data.user.role === 'admin') {
                dispatch(setIsAdmin(true));
            } else {
                dispatch(setIsAdmin(false))
            }
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

    if (isAuthenticated) {
        return <Navigate to={'/'} />
    }


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
            <div className={`mb-6 ${isClick ? 'hidden' : 'block'}`}>
                <label className="block text-gray-800 text-sm font-semibold mb-2 cursor-pointer" htmlFor="profile">
                    <span className='text-xl'><BiSolidCamera /></span>
                    <span>Upload Profile</span>
                    <input
                        className=""
                        id="profile"
                        type="file"
                        onChange={(e) => {
                            handleProfile(e)
                        }}
                    />
                </label>
                <div className='w-full flex justify-center'>
                    {loading ? <MoonLoader
                        color="black"
                        size='30'
                    /> : <img src={profile.url} className='w-28 h-28 rounded-full' />}
                </div>
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
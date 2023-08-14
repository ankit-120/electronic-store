import React, { useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuthenticated, setIsAdmin } from '../facilities/commonSlice';
import { Link } from 'react-router-dom';
import { logout } from '../apis';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../facilities/userSlice';

const LoginBtn = () => {

    const { userInfo } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.common);

    const handleLogout = async () => {
        const { data } = await axios.get(logout(), { withCredentials: true })
        toast(data.message)
        dispatch(setIsAuthenticated(false))
        dispatch(setIsAdmin(false))
        dispatch(setUserInfo({}));
        navigate('/login')
    }

    return (
        <>
            {
                !isAuthenticated ? (
                    <Link to={'/login'}
                        className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 md:mb-0 hover:text-gray-900 transition-transform duration-100 hover:scale-125">
                        Login
                    </Link>
                ) : (
                    <div className="relative">
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900 cursor-pointer transition-transform duration-100 hover:scale-125">

                            {userInfo.name}
                        </div>
                        <div
                            className={`absolute top-10 right-0 bg-white shadow-lg p-2 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'} transform transition-opacity duration-400 ease-in-out rounded-md w-32`}
                        >
                            <ul>
                                <Link>
                                </Link>
                                <li className="py-1 flex justify-center items-center cursor-pointer transition-transform duration-100 hover:scale-105">
                                    <Link to={'/account'}>
                                        <img className='w-10 h-10 rounded-full object-cover mr-2'
                                            src={`${import.meta.env.VITE_URL}/images/${userInfo.avatar}`} />
                                        Account
                                    </Link>
                                </li>
                                <hr />
                                <li className="py-1 text-center cursor-pointer transition-transform duration-100 hover:scale-105"
                                    onClick={() => (handleLogout())}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default LoginBtn
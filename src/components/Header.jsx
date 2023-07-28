import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../facilities/filterSlice';
import { useLocation } from 'react-router-dom';
import { getProfile, logout } from '../apis';
import axios from 'axios';
import { setIsLoggedIn } from '../facilities/commonSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isProductPage = location.pathname.includes('/products');
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const { isAuthenticated, isLoggedin } = useSelector((state) => state.common);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const fetchProfile = async () => {
        const { data } = await axios.get(getProfile(), { withCredentials: true })
        console.log(data.success)
        if (data.success) {
            setUser(data.user);
            dispatch(setIsLoggedIn())
        }

    }

    useEffect(() => {
        fetchProfile()
    }, [isAuthenticated])

    const handleLogout = async () => {
        const { data } = await axios.get(logout(), { withCredentials: true })
        toast(data.message)
        dispatch(setIsLoggedIn())
        navigate('/login')
    }

    return (
        <div>
            <header className="bg-slate-200 shadow-md fixed top-0 z-50 w-full">
                <div className="container mx-auto px-5 py-3 md:flex md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10"
                                src="/images/logo.png"
                                alt="logo"
                            />
                            <span className="ml-3 text-xl">Electronic Store</span>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="flex items-center px-3 py-2 border rounded text-gray-900 border-gray-900 hover:text-gray-500 hover:border-gray-500 focus:outline-none transition duration-300 ease-in-out"
                            >
                                <svg
                                    className={`h-6 w-6 ${showMenu ? 'hidden' : 'block'}`}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                                <svg
                                    className={`h-6 w-6 ${showMenu ? 'block' : 'hidden'}`}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {isProductPage && (
                        <div className={`md:ml-4 md:block ${showMenu ? 'block' : 'hidden'}`}>
                            <input
                                type="text"
                                placeholder="Search"
                                className="block pl-4 pr-10 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 transition duration-300 ease-in-out"
                                onChange={(e) => dispatch(updateSearch(e.target.value))}
                            />
                        </div>
                    )}

                    <nav className={`md:flex ${showMenu ? 'block' : 'hidden'} mt-4 md:mt-0`}>
                        <Link to={'/'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900">
                            Home
                        </Link>

                        <Link to={'/about'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900">
                            About
                        </Link>

                        <Link to={'/products'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900">
                            Products
                        </Link>

                        <Link to={'/cart'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900">
                            Cart
                        </Link>

                        <Link to={'/contact'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900">
                            Contact
                        </Link>


                        {
                            !isLoggedin ? (
                                <Link to={'/login'}
                                    className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900">
                                    Login
                                    {/* {isAuthenticated || Object.keys(user).length !== 0 ? user.name : 'Login'} */}
                                </Link>
                            ) : (
                                <div className="relative">
                                    <div
                                        onClick={toggleDropdown}
                                        className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900 cursor-pointer"
                                    >
                                        {user.name}
                                    </div>
                                    <div
                                        className={`absolute top-10 right-0 bg-white shadow-lg p-2 ${isOpen ? 'opacity-100' : 'opacity-0'} transform transition-all duration-400 ease-in-out rounded-md w-32`}
                                    >
                                        {/* Dropdown content */}
                                        <ul>
                                            <li className="py-1 text-center"
                                                onClick={() => (handleLogout())}>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProfile } from '../apis';
import axios from 'axios';
import { setIsAdmin, setIsAuthenticated } from '../facilities/commonSlice';
import LoginBtn from './LoginBtn';
import SearchBox from './SearchBox';
import Dropdown from './Dropdown';


const Header = () => {
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState({});
    const location = useLocation()
    const isProductPage = location.pathname.includes('/products');

    const { isAuthenticated } = useSelector((state) => state.common);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    //fetches user profile to make sure user is logged in
    const fetchProfile = async () => {
        const { data } = await axios.get(getProfile(), { withCredentials: true })
        if (data.success) {
            setUser(data.user);
            if (data.user.role === 'admin') {
                dispatch(setIsAdmin(true))
            }
            dispatch(setIsAuthenticated(true))
            console.log("setting state")
        } else {
            dispatch(setIsAuthenticated(false))
            dispatch(setIsAdmin(false))
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [isAuthenticated])

    return (
        <div>
            <header className="bg-slate-200 shadow-md fixed top-0 z-50 w-full">
                <div className="container mx-auto px-5 py-3 md:flex md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center transition-transform duration-100 hover:scale-105">
                            <img
                                className="w-10 h-10"
                                src="/images/logo.png"
                                alt="logo"
                            />
                            <span className="ml-3 text-xl">Electronic Store</span>
                        </div>

                        {/* login btn hidden at md devices */}
                        {/* hidden at md screens */}
                        <div className="md:hidden flex items-center">
                            <div className='mx-4'>
                                <LoginBtn user={user} />
                            </div>
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

                    {/* search box.................................................................. */}
                    {isProductPage && (
                        <div className={`md:ml-4 md:block mt-5 md:mt-0`}>
                            <SearchBox />
                        </div>
                    )}
                    <div className='flex md:hidden justify-end mt-2 cursor-pointer relative'>
                        <Dropdown />
                    </div>

                    {/* menu items............................................... */}
                    <nav className={`md:flex ${showMenu ? 'block' : 'hidden'} mt-4 md:mt-0`}>
                        <Link to={'/'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900 transition-transform duration-100 hover:scale-125">
                            Home
                        </Link>

                        <Link to={'/about'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900 transition-transform duration-100 hover:scale-125">
                            About
                        </Link>

                        <Link to={'/products'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900 transition-transform duration-100 hover:scale-125">
                            Products
                        </Link>

                        <Link to={'/cart'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900 transition-transform duration-100 hover:scale-125">
                            Cart
                        </Link>

                        <Link to={'/contact'}
                            className="flex justify-center w-full md:flex md:flex-col md:justify-center ml-0 md:ml-4 mb-2 md:mb-0 hover:text-gray-900 transition-transform duration-100 hover:scale-125">
                            Contact
                        </Link>

                        {/* Login................................................................................. */}
                        <div className='hidden md:block'>
                            <LoginBtn user={user} />
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;

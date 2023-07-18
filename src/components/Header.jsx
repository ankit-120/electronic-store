import { Link } from "react-router-dom"
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from "react-redux";
import { updateSearch } from "../facilities/filterSlice";
import { useLocation } from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const isProductPage = location.pathname.includes('/products');

    return (
        <div >
            <header className="text-gray-600 body-font bg-slate-100 shadow-md w-[100%] fixed top-0">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Tailblocks</span>
                    </div>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to={'/'} className="mr-5 hover:text-gray-900">Home</Link>
                        <Link to={'/about'} className="mr-5 hover:text-gray-900">About</Link>
                        <Link to={'/products'} className="mr-5 hover:text-gray-900">Products</Link>
                        <Link to={'/cart'} className="mr-5 hover:text-gray-900">Cart</Link>
                        <Link to={'/contact'} className="mr-5 hover:text-gray-900">Contact</Link>
                    </nav>
                    {
                        isProductPage &&
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-4 pr-10 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                onChange={(e) => dispatch(updateSearch(e.target.value))}
                            />
                            <BiSearch className="absolute right-3 top-2 text-gray-400 h-6 w-4" />
                        </div>
                    }
                </div>
            </header>
        </div>
    )
}

export default Header
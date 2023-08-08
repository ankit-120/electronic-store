import React, { useEffect, useState } from 'react'
import CircularLoader from '../components/CircularLoader';
import axios from 'axios';
import { deleteAllProduct, deleteItemFromCart, getMyCart } from '../apis';
import { toast } from 'react-hot-toast';

const Cart = () => {

    const [cart, setCart] = useState({});

    const fetchCart = async () => {
        const { data } = await axios.get(getMyCart(), { withCredentials: true })
        setCart(data.cart);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (idx, id, price) => {
        setCart({ ...cart, products: cart.products.filter((prod) => prod._id !== id), totalPrice: cart.totalPrice - price });
        const { data } = await axios.delete(deleteItemFromCart(idx), { withCredentials: true });
        toast(data.message);
    }

    const handleClear = async () => {
        setCart({ ...cart, products: [], totalPrice: 0 })
        const { data } = await axios.delete(deleteAllProduct(), { withCredentials: true });
        toast(data.message);
    }

    if (Object.keys(cart).length === 0) {
        return <CircularLoader />
    }

    return (
        <div className='grid grid-cols-3'>
            <div className='md:col-span-2 col-span-3 '>
                {
                    cart.products.map((item, i) => (
                        <div key={i + 30}
                            className='grid grid-cols-4 border-[1px] border-slate-200 m-2'>
                            <div className='md:col-span-1 col-span-2 flex justify-center'>
                                <img className='md:h-32 h-40 p-2'
                                    src={`${import.meta.env.VITE_URL}/images/${item.images[0]}`}
                                    alt="img" />
                            </div>
                            <div className='md:col-span-3 col-span-2 grid grid-cols-4'>
                                <div className='md:col-span-1 col-span-4 md:text-center font-bold text-yellow-600 md:pt-2'>
                                    {item.brand}
                                </div>
                                <div className='md:col-span-1 col-span-4 md:text-center md:pt-2'>
                                    {item.title}
                                </div>
                                <div className='md:col-span-1 col-span-4 md:text-center md:pt-2'>Quantity</div>
                                <div className='md:col-span-1 col-span-4 md:text-center flex flex-col justify-between md:pt-2'>
                                    <div>
                                        ₹{item.price}
                                        <div className="text-yellow-600">
                                            ({item.discountPercentage} %off)
                                        </div>
                                    </div>
                                    <div className='md:pb-2 text-red-700 cursor-pointer'
                                        onClick={() => handleRemove(i, item._id, item.price)}>
                                        Remove
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className='flex justify-center'>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
                        onClick={() => handleClear()}>
                        Clear Cart
                    </button>
                </div>
            </div>
            <div className='md:col-span-1 col-span-3 bg-gray-100 py-2 px-4'>
                <div className='font-bold text-xl'>Order Details</div>
                <div>Total items : {cart.products.length}</div>
                <div className='font-semibold'>Order total : ₹{cart.totalPrice}</div>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 md:mt-8 w-full rounded-none shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default Cart
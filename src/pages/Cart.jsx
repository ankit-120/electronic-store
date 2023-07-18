import React, { useEffect, useState } from 'react'
import CircularLoader from '../components/CircularLoader';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../facilities/cartSlice';

const Cart = () => {

    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const [cartItem, setCartItem] = useState([]);
    const [total, setTotal] = useState();

    useEffect(() => {
        setCartItem(JSON.parse(localStorage.getItem('cartItem')));
    }, [cart])

    if (cartItem.length === 0) {
        return <CircularLoader />
    }

    return (
        <div className='grid grid-cols-3'>
            <div className='md:col-span-2 col-span-3 border-[1px] border-slate-200'>
                {
                    cartItem.map((item, i) => (
                        <div key={i + 30}
                            className='grid grid-cols-4'>
                            <div className='md:col-span-1 col-span-2 flex justify-center'>
                                <img className='md:h-32 h-40 p-2'
                                    src={item.thumbnail}
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
                                        onClick={() => dispatch(removeFromCart(item.id))}>
                                        Remove
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='md:col-span-1 col-span-3 bg-gray-100 py-2 px-4'>
                <div className='font-bold text-xl'>Order details</div>

            </div>
        </div>
    )
}

export default Cart
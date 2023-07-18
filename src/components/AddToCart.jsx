import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../facilities/cartSlice'
import { Link } from 'react-router-dom';

const AddToCart = ({ product }) => {
    const dispatch = useDispatch();

    const [isAdded, setIsAdded] = useState(false);

    const checkCart = () => {
        const cart = JSON.parse(localStorage.getItem('cartItem')) || [];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                // setIsAdded(true)
                return true;
            }
        }
        return false;
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='text-3xl text-yellow-600 font-bold'>{product.brand}</div>
            <div className='font-bold py-5 text-xl'>{product.title}</div>
            <div className='w-full text-center pb-5'>{product.description}</div>
            <div className='pb-5 text-2xl'>₹ {product.price}
                <span className='text-yellow-600'>({product.discountPercentage}% off)</span>
            </div>
            <div className='md:pt-5'>
                {
                    checkCart() ? (
                        <Link to={'/cart'}>
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
                                Go to Cart
                            </button>
                        </Link>
                    ) :
                        (
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
                                onClick={() => {
                                    dispatch(addToCart(product))
                                    setIsAdded(true)
                                }}>
                                Add to Cart
                            </button>
                        )
                }
            </div>
        </div>
    )
}

export default AddToCart
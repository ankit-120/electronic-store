import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addItemToCart, getMyCart } from '../apis';
import { toast } from 'react-hot-toast';

const AddToCart = ({ product }) => {

    //to re render when item is added to cart
    const [isAdded, setIsAdded] = useState(false);
    const [cart, setCart] = useState([{ id: 0 }]);

    const fetchCart = async () => {
        const { data } = await axios.get(getMyCart(), { withCredentials: true })
        if (data.success) {
            setCart(data.cart.products);
        }
    }

    //fetch user cart from db 
    useEffect(() => {
        fetchCart();
    }, [isAdded])
    //fn to check which product is in the cart
    const checkCart = () => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                return true;
            }
        }
        return false;
    }

    //fn to handle add to cart
    const handleAddToCart = async () => {
        const { data } = await axios.post(addItemToCart(), { product }, { withCredentials: true })
        console.log(data)
        if (data.success) {
            toast(data.message);
            setIsAdded(true);
        } else {
            toast("Cart error");
        }
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
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                                Go to Cart
                            </button>
                        </Link>
                    ) :
                        (
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                                onClick={() => {
                                    handleAddToCart()
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
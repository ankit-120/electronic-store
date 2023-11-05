import axios from 'axios'
import { getFeaturedProduct } from '../apis'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FeaturedProducts = () => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchFeaturedProduct = async () => {
            const { data } = await axios.get(getFeaturedProduct(4));
            setProduct(data.products);
        }
        fetchFeaturedProduct()
    }, []);

    return (
        <>
            {product && <div className='p-5 grid md:grid-cols-4 grid-cols-1 gap-4 items-center '>
                {
                    product.map((prod, i) => (
                        <Link to={`product/${prod._id}`} key={i - 10} >
                            <div>
                                <div className='hover:bg-gray-200 transition-transform duration-500 hover:scale-110 h-full w-full p-3 flex flex-col justify-center'>
                                    <img className='h-[200px] object-contain'
                                        src={prod.thumbnail}
                                        alt="img" />

                                    <p className='px-3'>{prod.title}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>}
        </>
    )
}

export default FeaturedProducts
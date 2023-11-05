import axios from 'axios'
import { getFeaturedProduct } from '../apis'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'

const FeaturedProducts = () => {

    // const [product, setProduct] = useState([])
    const product = [
        {
            brand: "Apple",
            category: "Laptops",
            createdBy: "64cb9aefa2f143c04a50c638",
            description:
                "MacBook Pro 2021 with mini-LED display may launch between September, November",
            discountPercentage: 11.02,
            images: [
                "16912380036261.png",
                "16912380036262.jpg",
                "16912380036263.png",
                "16912380036274.jpg",
            ],
            price: 1749,
            stock: 83,
            title: "MacBook Pro",
            _id: "64ce3e736b40552035bfd0a7",
        },
        {
            brand: "Apple",
            category: "Smartphones",
            createdBy: "64cb9aefa2f143c04a50c638",
            description:
                "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            discountPercentage: 17.94,
            images: [
                "16912935875511.jpg",
                "16912935875512.jpg",
                "16912935875523.jpg",
                "16912935875524.jpg",
            ],
            price: 899,
            stock: 34,
            title: "iPhone X",
            _id: "64cf1793057ce64744290c7f",
        },
        {
            brand: "OPPO",
            category: "Smartphones",
            createdBy: "64cb9aefa2f143c04a50c638",
            description: "PPO F19 is officially announced on April 2021.",
            discountPercentage: 17.91,
            images: [
                "16912937285881.jpg",
                "16912937285892.jpg",
                "16912937285893.jpg",
                "16912937285894.jpg",
            ],
            price: 280,
            stock: 123,
            title: "OPPOF19",
            _id: "64cf1820057ce64744290c85",
        },
        {
            brand: "Microsoft Surface",
            category: "Laptops",
            createdBy: "64cb9aefa2f143c04a50c638",
            description:
                "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
            discountPercentage: 10.23,
            images: [
                "16912381342501.jpg",
                "16912381342512.jpg",
                "16912381342513.jpg",
                "16912381342524.jpg",
            ],
            price: 1499,
            stock: 68,
            title: "Microsoft Surface Laptop 4",
            _id: "64ce3ef66b40552035bfd0ad",
        },
    ];
    

    // useEffect(() => {
    //     const fetchFeaturedProduct = async () => {
    //         const { data } = await axios.get(getFeaturedProduct(4));
    //         setProduct(data.products);
    //     }
    //     fetchFeaturedProduct()
    // }, []);

    return (
        <>
            {product && <div className='p-5 grid md:grid-cols-4 grid-cols-1 gap-4 items-center '>
                {
                    product.map((prod, i) => (
                        // <Link to={`product/${prod._id}`} key={i - 10} >
                        //     <div>
                        //         {console.log(prod)}
                        //         <div className='hover:bg-gray-200 transition-transform duration-500 hover:scale-110 h-full w-full p-3 flex flex-col justify-center'>
                        //             <img className='h-[200px] object-contain'
                        //                 src={prod.thumbnail}
                        //                 alt="img" />

                        //             <p className='px-3'>{prod.title}</p>
                        //         </div>
                        //     </div>
                        // </Link>
                        <Link to={`/product/${prod._id}`} key={prod._id}>
                                <SingleProduct prod={prod} />
                            </Link>
                    ))
                }
            </div>}
        </>
    )
}

export default FeaturedProducts
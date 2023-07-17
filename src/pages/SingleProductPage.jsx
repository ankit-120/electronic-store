import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ImageList from '../components/ImageList';
import axios from 'axios';
import { getProduct } from '../apis';
import AddToCart from '../components/AddToCart';

const SingleProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const { selectedImage } = useSelector((state) => state.images);

    const fetchProduct = async () => {
        const { data } = await axios.get(getProduct(id));
        setProduct(data);
    }
    product && console.log("cond ", product)

    useState(() => {
        fetchProduct();
    }, []);

    return (
        <div className='grid grid-cols-6 gap-2'>
            <div className='col-span-6 flex md:col-span-1 md:flex md:flex-col justify-center'>
                {Object.keys(product).length && <ImageList images={product.images} />}
            </div>
            <div className='col-span-6 md:col-span-3 flex-grow'>
                <img className='md:h-[500px] h-[300px] w-full object-contain'
                    src={selectedImage} alt="no prod" />
            </div>
            <div className='col-span-6 md:col-span-2 w-[90vw] md:w-full md:flex md:flex-col md:justify-center'>
                {Object.keys(product).length && <AddToCart product={product} />}
            </div>
        </div>
    )
}

export default SingleProductPage
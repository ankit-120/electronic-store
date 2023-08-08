import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateImage } from '../facilities/imageSlice'

const ImageList = ({ images }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateImage(images[0]));
    }, []);

    return (
        <div className='flex md:flex-col items-center md:justify-center'>
            {
                images.map((image, i) => (
                    <div className='md:px-8 px-2 py-1' key={i + 20}>
                        <img className='border-2 border-gray-300 p-1 w-20 h-20 object-contain'
                            src={`http://localhost:5000/images/${image}`} alt="no image"
                            onClick={() => dispatch(updateImage(image))}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default ImageList
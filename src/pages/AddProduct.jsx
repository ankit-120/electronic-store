import axios from 'axios'
import React, { useState } from 'react'
import { addProduct } from '../apis'
import { toast } from 'react-hot-toast'
import { BiImageAdd } from 'react-icons/bi'
import { MoonLoader } from 'react-spinners';

const AddProduct = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: '',
        price: '',
        discount: '',
        stock: '',
        brand: '',
        category: '',
    })
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState();

    const handleImages = async (e) => {
        setLoading(true);
        const files = e.target.files;
        const filesArray = Array.from(files);
        setImages(filesArray);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let flag = false;
        try {
            Object.keys(formData).forEach((field) => {
                if (formData[field] === '') {
                    toast.error(`Please provide ${field}`)
                    flag = true;
                }
            })
            if (images.length === 0) {
                toast.error('Please provide atleast one product image')
                return
            }
            if (flag) {
                return
            }
            const form = new FormData();
            form.append('json', JSON.stringify(formData));

            images.forEach((file, index) => {
                form.append(`file`, file);
            });

            for (var key of form.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }

            const { data } = await axios.post(addProduct(), form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
            toast.success(data.message);
            setFormData({
                title: "",
                description: '',
                price: '',
                discount: '',
                stock: '',
                brand: '',
                category: '',
            });
            setImages([])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-slate-100 rounded shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">Add New Product</h2>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="price">
                    Price
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Enter product price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="discount">
                    Discount
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="discount"
                    type="number"
                    placeholder="Enter product discount"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="stock">
                    Stock
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    type="number"
                    placeholder="Enter product stock"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="brand">
                    Brand
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="brand"
                    type="text"
                    placeholder="Enter product brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="category">
                    Category
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    type="text"
                    placeholder="Enter product category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="images">
                    Add Images<span className='text-3xl'><BiImageAdd /></span>
                </label>
                <input
                    type="file"
                    id='images'
                    className="mb-3 focus:outline-none focus:shadow-outline"
                    multiple
                    onChange={handleImages}
                    required
                />
                {
                    loading ? <MoonLoader color="black" size='30' />
                        :
                        <div>
                            <h3 className={`mb-2 text-sm ${images.length ? 'block' : 'hidden'} `}>Selected Files</h3>
                            <div className="list-disc ml-6 grid grid-cols-4 gap-2">
                                {images.map((img, index) => (
                                    // <li key={index} className="mb-1">{img.name}</li>
                                    <div key={index} className="mb-1"><img src={URL.createObjectURL(img)} alt="" /></div>
                                ))}
                            </div>
                        </div>
                }
            </div>

            <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 mb-6 w-full"
                onClick={handleSubmit}
            >
                Add Product
            </button>
        </div>

    )
}

export default AddProduct
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryFilter, setBrandFilter, setPriceFilter, clearFilter } from '../facilities/filterSlice'
import { BiFilter } from 'react-icons/bi'

const Filter = () => {

    const { categoryList, brandList } = useSelector((state) => state.filters);
    const { filterList, priceFilter } = useSelector((state) => state.filters);
    const [price, setPrice] = useState({
        min: priceFilter.min,
        max: priceFilter.max
    })
    const dispatch = useDispatch();

    return (
        <div className='pt-5 px-2'>
            <div className='text-3xl font-semibold text-center py-2'>Filter</div>

            {/* category filter  */}
            <div className='py-2'>
                <div className='text-md ml-1'>Category</div>
                <select className="block w-full px-2 py-1 bg-slate-50 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-slate-500 outline-none"
                    value={filterList.category}
                    onChange={(e) => dispatch(setCategoryFilter(e.target.value))}>
                    <option value="" >All Product</option>
                    {categoryList.map((item, i) => (
                        <option
                            className='py-5 block'
                            key={i + 10}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div className='py-2'>
                <div className='text-md ml-1'>Brand</div>
                <select className="block w-full px-2 py-1 bg-slate-50 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-slate-500 outline-none"
                    value={filterList.brand}
                    onChange={(e) => dispatch(setBrandFilter(e.target.value))}>
                    <option value="">All Brand</option>
                    {brandList.map((item, i) => (
                        <option
                            className='py-5 block'
                            key={i + 10}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {/* price filter  */}
            <div>
                <div className='text-md ml-1'>Price</div>
                <div className='flex'>
                    <input
                        className='w-full rounded-md mr-2 px-4 py-1 outline-none focus:ring focus:ring-opacity-50 focus:ring-slate-500'
                        placeholder='Min'
                        type="text"
                        value={price.min}
                        // value={priceFilter.min !== '' ? priceFilter.min : price.min}
                        onChange={(e) => setPrice({ ...price, min: e.target.value })} />
                    <input
                        className='w-full rounded-md ml-2 px-4 py-1 outline-none focus:ring focus:ring-opacity-50 focus:ring-slate-500'
                        placeholder='Max'
                        type="text"
                        value={price.max}
                        // value={priceFilter.max !== '' ? priceFilter.max : price.max}
                        onChange={(e) => setPrice({ ...price, max: e.target.value })} />
                </div>
                <div className='text-center p-2'>
                    <button
                        className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300 transition-transform duration-100 hover:scale-110"
                        onClick={() => dispatch(setPriceFilter(price))}>
                        Go
                    </button>
                </div>
            </div>

            {/* clear filter  */}
            <div className='text-center p-2'>
                <button
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300 transition-transform duration-100 hover:scale-110"
                    onClick={() => dispatch(clearFilter())}>
                    Clear Filters
                </button>
            </div>

        </div >

    )
}

export default Filter
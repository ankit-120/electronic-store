import React from 'react'

import { useDispatch } from 'react-redux';
import { setSearch } from '../facilities/productSlice';
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react';

const SearchBox = () => {

    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('')


    return (
        <>

            <div className="flex items-center bg-white rounded-lg shadow-md">
                <input
                    type="text"
                    className="py-2 px-4 border-0 outline-none rounded-l-lg w-full"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="bg-transparent text-yellow-500 p-2 rounded-full hover:bg-yellow-100 focus:outline-none transition-transform duration-100 hover:scale-110"
                    onClick={() => dispatch(setSearch(keyword))}>
                    <AiOutlineSearch size={20} />
                </button>
            </div>

        </>
    )
}

export default SearchBox
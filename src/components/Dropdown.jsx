import React from 'react'
import { useState } from 'react'
import Filter from './Filter'
import { BiFilter } from 'react-icons/bi'

const Dropdown = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className=''>
            <div className='flex'
                onClick={() => setIsOpen(!isOpen)}>
                <BiFilter />Filter
            </div>
            <div className={`absolute right-0 top-[calc(100%+0.25rem)] ${isOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity ease-in-out duration-200 bg-white shadow-lg p-3 rounded-md w-full`}>
                <Filter />
            </div>
        </div>
    )
}

export default Dropdown
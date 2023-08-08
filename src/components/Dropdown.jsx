import React from 'react'
import { useState } from 'react'

const Dropdown = ({ items }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'>
            <div
                onClick={() => setIsOpen(!isOpen)}>
                Category
            </div>
            <div className={`absolute left-0 top-[calc(100%+0.25rem)] ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in-out duration-200 bg-white shadow-lg p-3 rounded-md`}>

            </div>
        </div>
    )
}

export default Dropdown
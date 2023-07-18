import React, { useState } from "react";
import { updatePrice } from '../facilities/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { price } = useSelector((state) => state.filters);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div
                className=" text-black font-semibold py-3 px-6 rounded-none shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 focus:outline-none"
                onClick={toggleDropdown}
            >
                Toggle Dropdown
            </div>
            {isOpen && (
                <div className="absolute top-10 left-0 w-48 bg-white rounded shadow-lg z-10">
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <input
                                type="radio"
                                id="ascending"
                                name="sort"
                                checked={price === 'lowToHigh'}
                                onChange={() => dispatch(updatePrice('lowToHigh'))}
                            />
                            <label htmlFor="ascending" className="ml-2">
                                Ascending
                            </label>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <input
                                type="radio"
                                id="descending"
                                name="sort"
                                checked={price === 'highToLow'}
                                onChange={() => dispatch(updatePrice('highToLow'))}
                            />
                            <label htmlFor="descending" className="ml-2">
                                Descending
                            </label>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

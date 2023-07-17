import React, { useState } from "react";
import { updatePrice } from '../facilities/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Dropdown = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { price } = useSelector((state) => state.filters);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={toggleDropdown}
            >
                Toggle Dropdown
            </button>
            {isOpen && (
                <div className="top-10 right-30 mt-2 md:w-[90%] w-full bg-white rounded shadow-lg h-fit overflow-y-auto ">
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-200">
                            <input type="radio" id='ascending' name="sort"
                                checked={price === 'lowToHigh'}
                                onChange={() => dispatch(updatePrice('lowToHigh'))} />
                            <label htmlFor="ascending">Ascending</label>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-200">
                            <input type="radio" id='descending' name="sort"
                                checked={price === 'highToLow'}
                                onChange={() => dispatch(updatePrice('highToLow'))} />
                            <label htmlFor="descending">Descending</label>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

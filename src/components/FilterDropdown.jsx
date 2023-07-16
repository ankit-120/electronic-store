import React, { useState } from "react";
import { addCategory, removeCategory } from '../facilities/filterSlice';
import { useDispatch } from 'react-redux';

const Dropdown = ({ filters, selectedFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={toggleDropdown}
            >
                Toggle Dropdown
            </button>

            {isOpen && (
                <div className="absolute top-10 right-30 mt-2 w-[90%] bg-white rounded shadow-lg h-80 overflow-y-auto ">
                    <ul className="py-2">

                        {
                            filters.map((filter, i) => (
                                <li key={i + 10} className="px-4 py-2 hover:bg-gray-200">
                                    <input type="checkbox" id={filter} value={filter}
                                        checked={selectedFilters.includes(filter)}
                                        onChange={
                                            (e) => !selectedFilters.includes(filter) ? dispatch(addCategory(e.target.value)) : dispatch(removeCategory(e.target.value))} />
                                    <label htmlFor={filter}>{filter}</label>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

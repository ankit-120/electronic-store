import React, { useState } from "react";

import { useDispatch } from 'react-redux';

const Dropdown = ({ filters, selectedFilters, add, remove }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

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
                    {filters.length}
                    <ul className="py-2">
                        {
                            filters.map((filter, i) => (
                                <li key={i + 10} className="px-4 py-2 hover:bg-gray-200">
                                    <input type="checkbox" id={filter} value={filter}
                                        checked={selectedFilters.includes(filter)}
                                        onChange={
                                            (e) => !selectedFilters.includes(filter) ? dispatch(add(e.target.value)) : dispatch(remove(e.target.value))} />
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

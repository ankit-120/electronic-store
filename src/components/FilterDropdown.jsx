import React, { useState } from "react";
import { useDispatch } from 'react-redux';

const FilterDropdown = ({ filters, selectedFilters, add, remove }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 w-full rounded-none"
                onClick={toggleDropdown}
            >
                Toggle Dropdown
            </div>
            {isOpen && (
                <div className="absolute top-10 left-0 w-48 bg-white rounded shadow-lg z-10">
                    <ul className="py-2">
                        {filters.map((filter, i) => (
                            <li
                                key={i + 10}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    id={filter}
                                    value={filter}
                                    checked={selectedFilters.includes(filter)}
                                    onChange={(e) =>
                                        !selectedFilters.includes(filter)
                                            ? dispatch(add(e.target.value))
                                            : dispatch(remove(e.target.value))
                                    }
                                />
                                <label htmlFor={filter} className="ml-2">
                                    {filter}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;

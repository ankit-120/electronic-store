import { useState, useEffect } from 'react';
import { getCategories } from '../apis';
import axios from 'axios';
import FilterDropdown from './FilterDropdown';
import { useSelector } from 'react-redux';

const Filter = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const categoryList = useSelector((state) => state.filters.categoryList);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            const { data } = await axios.get(getCategories());
            setCategories(data)
        }
        fetchCategory();
    }, [])

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    if (!isSmallScreen) {
        return (
            <div>
                <div>
                    <FilterDropdown filters={categories} selectedFilters={categoryList} />
                </div>

            </div>
        );
    }

    return (
        <div>
            <button
                onClick={toggleContent}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Toggle
            </button>

            {showContent && (
                <div className="bg-gray-200 p-4">
                    {/* <p><FilterModal /></p> */}
                </div>
            )}
        </div>
    );
};

export default Filter;

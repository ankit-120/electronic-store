import { useState, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import { useDispatch, useSelector } from 'react-redux';
import PriceFilterDropdown from './PriceFilterDropdown';
import { clearFilter } from '../facilities/filterSlice';
import { addCategory, removeCategory, addBrand, removeBrand } from '../facilities/filterSlice';

const Filter = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const { categoryList, brandList } = useSelector((state) => state.filters);
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    const setCategories = () => {
        return [...new Set(products.map((product) => product.category))];
    };

    const setBrands = () => {
        return [...new Set(products.map((product) => product.brand))];
    };

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

    return (
        <div className="bg-white rounded-md p-4 shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Filter Options</h2>
                {isSmallScreen && (
                    <button
                        onClick={toggleContent}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {showContent ? 'Hide Filters' : 'Show Filters'}
                    </button>
                )}
            </div>

            {(!isSmallScreen || showContent) && (
                <div className="space-y-4">
                    <FilterDropdown filters={setCategories()} selectedFilters={categoryList} add={addCategory} remove={removeCategory} />
                    <FilterDropdown filters={setBrands()} selectedFilters={brandList} add={addBrand} remove={removeBrand} />
                    <PriceFilterDropdown />
                    {!isSmallScreen && (
                        <div className="flex justify-center">
                            <button
                                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 w-full rounded-none"
                                onClick={() => dispatch(clearFilter())}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            )}

            {isSmallScreen && showContent && (
                <div className="mt-4">
                    <button
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 w-full rounded-none"
                        onClick={() => dispatch(clearFilter())}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filter;

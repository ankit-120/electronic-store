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
    }

    const setBrands = () => {
        return [...new Set(products.map((product) => product.brand))];
    }

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
                    <FilterDropdown filters={setCategories()} selectedFilters={categoryList} add={addCategory} remove={removeCategory} />
                    <FilterDropdown filters={setBrands()} selectedFilters={brandList} add={addBrand} remove={removeBrand} />
                    <PriceFilterDropdown />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => dispatch(clearFilter())}>
                        Click Me
                    </button>

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
                <div className="absolute left-0 bg-white flex flex-col items-start min-h-screen w-full pl-7">
                    <FilterDropdown filters={categories} selectedFilters={categoryList} />
                    <FilterDropdown filters={brand} selectedFilters={categoryList} />
                </div>
            )}
        </div>
    );
};

export default Filter;

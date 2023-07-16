import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSmartphones, filterLaptops, filterSkincare, filterFragrances } from '../facilities/filterSlice';

const Filter = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const { smartphones, laptops, skincare, fragrances } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

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

                <div className="bg-gray-200 p-4">
                    <input type="checkbox" id="smartphones" value="smartphones"
                        checked={smartphones}
                        onChange={() => dispatch(filterSmartphones())} />
                    <label htmlFor="smartphones">Smartphones</label>
                </div>
                <div className="bg-gray-200 p-4">
                    <input type="checkbox" id="laptops" value="laptops"
                        checked={laptops}
                        onChange={() => dispatch(filterLaptops())} />
                    <label htmlFor="laptops">Laptops</label>
                </div>
                <div className="bg-gray-200 p-4">
                    <input type="checkbox" id="skincare" value="skincare"
                        checked={skincare}
                        onChange={() => dispatch(filterSkincare())} />
                    <label htmlFor="skincare">Skincare</label>
                </div>
                <div className="bg-gray-200 p-4">
                    <input type="checkbox" id="fragrances" value="fragrances"
                        checked={fragrances}
                        onChange={() => dispatch(filterFragrances())} />
                    <label htmlFor="fragrances">Fragrances</label>
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
                    <p>This is the content.</p>
                </div>
            )}
        </div>
    );
};

export default Filter;

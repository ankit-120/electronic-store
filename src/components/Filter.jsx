import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, removeCategory } from '../facilities/filterSlice';

const Filter = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const categoryList = useSelector((state) => state.filters.categoryList);
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
                        checked={categoryList.includes('smartphones')}
                        onChange={
                            (e) => !categoryList.includes('smartphones') ? dispatch(addCategory(e.target.value)) : dispatch(removeCategory(e.target.value))} />
                    <label htmlFor="smartphones">Smartphones</label>
                </div>
                <div className="bg-gray-200 p-4">
                    <input type="checkbox" id="laptops" value="laptops"
                        checked={categoryList.includes('laptops')}
                        onChange={
                            (e) => !categoryList.includes('laptops') ? dispatch(addCategory(e.target.value)) : dispatch(removeCategory(e.target.value))} />
                    <label htmlFor="laptops">Laptops</label>
                </div>
                <div className="bg-gray-200 p-4">
                    <input type="checkbox" id="skincare" value="skincare"
                        checked={categoryList.includes('skincare')}
                        onChange={
                            (e) => !categoryList.includes('skincare') ? dispatch(addCategory(e.target.value)) : dispatch(removeCategory(e.target.value))} />
                    <label htmlFor="skincare">Skincare</label>
                </div>
                <div className="bg-gray-200 p-4">
                    <input type="checkbox" id="fragrances" value="fragrances"
                        checked={categoryList.includes('fragrances')}
                        onChange={
                            (e) => !categoryList.includes('fragrances') ? dispatch(addCategory(e.target.value)) : dispatch(removeCategory(e.target.value))} />
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

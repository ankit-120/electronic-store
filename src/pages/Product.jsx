import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import SingleProduct from "../components/SingleProduct";
import { getBrands, getCategories, getProducts } from "../apis";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../facilities/productSlice";
import { Link } from "react-router-dom";
import CircularLoader from "../components/CircularLoader";
import ReactPaginate from "react-paginate";
import '../css/product.css'
import { addCategory, addBrand } from "../facilities/filterSlice";

const Product = () => {

    const { products, productCount, limit, search } = useSelector((state) => state.products);
    const { filterList, priceFilter } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const [notFound, setNotFound] = useState(false);

    const filterCategoryLink = () => {
        if (filterList.category !== '')
            return `&category=${filterList.category}`
        else
            return ''
    }

    const filterBrandLink = () => {
        if (filterList.brand !== '')
            return `&brand=${filterList.brand}`
        else
            return ''
    }

    const filterPriceLink = () => {
        if (priceFilter.min !== '' && priceFilter.max !== '') {
            return `&price[$gte]=${priceFilter.min}&price[$lte]=${priceFilter.max}`
        } else {
            return ''
        }
    }

    // get all the products
    const fetchProducts = async (e) => {
        const { data } = await axios.get(getProducts() + `?keyword=${search}&page=${e !== undefined ? e.selected + 1 : 1}${filterCategoryLink()}${filterBrandLink()}${filterPriceLink()}`);
        if (data.products.length === 0) {
            setNotFound(true);
        } else {
            setNotFound(false)
        }
        dispatch(fetchProduct(data));
    }

    //get all categories
    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(getCategories());
            dispatch(addCategory(data.categories));
        } catch (error) {
            console.log(error);
        }
    }

    //get all brands
    const fetchBrands = async () => {
        try {
            const { data } = await axios.get(getBrands());
            dispatch(addBrand(data.brands));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [search, filterList, priceFilter]);

    useEffect(() => {
        fetchCategories();
        fetchBrands()
    }, []);

    const handlePageChange = (e) => {
        fetchProducts(e);
    }

    if (products.length === 0 && !notFound) {
        return <CircularLoader />
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            <div className="col-span-4 md:col-span-1 mt-5 shadow-lg rounded-lg md:block hidden">
                <Filter />
            </div>
            <div className="col-span-4 md:col-span-3">
                {/* no product found  */}
                <div
                    className={`${notFound ? 'block' : 'hidden'} h-full w-full flex justify-center items-center text-lg`}>
                    No products found
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        products.map((prod) => (
                            <Link to={`/product/${prod._id}`} key={prod._id}>
                                <SingleProduct prod={prod} />
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="col-span-4 mt-36">
                <ReactPaginate
                    pageCount={Math.ceil(productCount / limit)}
                    pageRangeDisplayed={1}
                    onPageChange={(e) => handlePageChange(e)}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeClassName="active"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                />
            </div>
        </div>
    )
}

export default Product
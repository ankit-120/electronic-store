import { useEffect } from "react";
import Filter from "../components/Filter";
import SingleProduct from "../components/SingleProduct";
import { getProducts } from "../apis";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../facilities/productSlice";
import { Link } from "react-router-dom";
import CircularLoader from "../components/CircularLoader";

const Product = () => {

    const products = useSelector((state) => state.products.products);
    const { categoryList, search, price, brandList } = useSelector((state) => state.filters);;
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        const { data } = await axios.get(getProducts());

        dispatch(fetchProduct(data.products));
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const modifyProducts = () => {
        let modifiedProd = Array.from(products);
        if (categoryList.length !== 0) {
            modifiedProd = modifiedProd.filter((prod) => {
                for (let i = 0; i < categoryList.length; i++) {
                    if (prod.category === categoryList[i])
                        return prod;
                }
            })
        }
        if (brandList.length !== 0) {
            modifiedProd = modifiedProd.filter((prod) => {
                for (let i = 0; i < brandList.length; i++) {
                    if (prod.brand === brandList[i])
                        return prod;
                }
            })
        }
        if (search) {
            modifiedProd = modifiedProd.filter((prod) =>
                prod.title.toLowerCase().includes(search.toLowerCase())
                || prod.category.toLowerCase().includes(search.toLowerCase())
                || prod.brand.toLowerCase().includes(search.toLowerCase())
            )
        }
        if (price) {
            modifiedProd = modifiedProd.sort((a, b) => {
                return price === 'lowToHigh' ? a.price - b.price : b.price - a.price
            })
        }

        return modifiedProd;
    }

    if (modifyProducts().length === 0) {
        return <CircularLoader />
    }

    return (
        <div className="grid grid-cols-4">
            <div className="col-span-4 md:col-span-1">
                <Filter />
            </div>
            <div className="col-span-4 md:col-span-3">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        modifyProducts().map((prod) => (
                            <Link to={`/product/${prod.id}`} key={prod.id}>
                                <SingleProduct prod={prod} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Product
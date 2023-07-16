import { useEffect } from "react";
import Filter from "../components/Filter";
import SingleProduct from "../components/SingleProduct";
import { getProducts } from "../apis";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../facilities/productSlice";

const Product = () => {

    const products = useSelector((state) => state.products.products);
    const { smartphones, laptops, skincare, fragrances } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        const { data } = await axios.get(getProducts());

        dispatch(fetchProduct(data.products));
    }
    useEffect(() => {
        fetchProducts();
        console.log("1")
    }, []);

    const modifyProducts = () => {
        let modifiedProd = products;
        if (smartphones)
            modifiedProd = modifiedProd.filter((prod) => prod.category === 'smartphones');
        if (laptops)
            modifiedProd = modifiedProd.filter((prod) => prod.category === 'laptops');
        // modifiedProd = [...modifiedProd, products.filter((prod) => prod.category === 'laptops')]
        if (skincare)
            modifiedProd = modifiedProd.filter((prod) => prod.category === 'skincare');
        if (fragrances)
            modifiedProd = modifiedProd.filter((prod) => prod.category === 'fragrances');
        return modifiedProd;
    }

    console.log(products)

    return (
        <div className="grid grid-cols-4 h-[90vh]">
            <div className="md:col-span-1">
                <Filter />
            </div>
            <div className="col-span-4 md:col-span-3 overflow-y-scroll">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        modifyProducts().map((prod) => (
                            <SingleProduct prod={prod} key={prod.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Product
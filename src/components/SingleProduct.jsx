const SingleProduct = ({ prod }) => {
    return (
        <div className="w-full border-2 border-indigo-400 p-3">
            <div className="border-2 border-indigo-300 p-2">
                <img className="w-full h-80 object-contain"
                    src={prod.images[0]}
                    alt={prod.title} />
            </div>
            <div>Product Name</div>
            <div>Add to cart</div>
        </div>
    )
}

export default SingleProduct
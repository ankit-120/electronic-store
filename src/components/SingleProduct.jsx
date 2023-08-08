const SingleProduct = ({ prod }) => {
    return (
        <div className="w-full p-3 hover:bg-gray-200 flex flex-col items-center">
            <div className="p-2">
                <img className="w-full h-60 object-contain"
                    src={`${import.meta.env.VITE_URL}/images/${prod.images[0]}`}
                    alt={prod.title} />
            </div>
            <div className="font-bold text-yellow-600">{prod.brand}</div>
            <div>{prod.title}</div>
            <div>₹{prod.price}
                <span className="text-yellow-600">
                    ({prod.discountPercentage} %off)
                </span>
            </div>
        </div>
    )
}

export default SingleProduct
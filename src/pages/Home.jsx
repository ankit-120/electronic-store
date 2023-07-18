import React from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
    return (
        <div className="bg-gray-100">
            <div className="p-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center order-2">
                        <p className="text-xl font-semibold text-slate-500 mb-2">Welcome to</p>
                        <p className="text-4xl font-bold text-slate-700 mb-4">Electronic Store</p>
                        <p className="text-lg text-gray-800">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque debitis earum eaque eum similique soluta unde incidunt sed blanditiis a eos maxime velit tempora nemo fugiat ab quidem accusantium, corporis qui totam!
                        </p>
                        <Link to={'/products'}>
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold my-5 py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                    <div className="order-1">
                        <img src='/images/landingimage.png' alt="img" className="rounded-lg shadow-md transition-transform duration-500 hover:scale-110" />
                    </div>
                </div>
            </div>
            <hr />

            <div className="mt-10">
                <p className="text-md font-semibold text-slate-500 ml-20">Check now!</p>
                <p className="text-xl font-bold text-slate-700 ml-20">Our Featured Products</p>
                <FeaturedProducts />
            </div>
        </div>
    );
};

export default Home;

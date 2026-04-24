import React from 'react'
import { Link } from 'react-router-dom'
import allProducts from '../../data/products'

const NewArrivals = () => {
    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-10">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Just In
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900">
                    New <span className="text-[#ea2e0e]">Arrivals</span>
                </h2>
                <p className="text-gray-500 text-sm max-w-md">
                    Fresh styles just landed. Be the first to wear the latest trends.
                </p>
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProducts.map((product) => (
                    <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="group flex flex-col gap-3"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 bg-[#ea2e0e] text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                                New
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-1 px-1">
                            <span className="text-xs text-gray-400 font-medium">{product.category}</span>
                            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#ea2e0e] transition-colors duration-200">
                                {product.name}
                            </h3>
                            <span className="text-sm font-bold text-gray-900">${product.price}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
                <Link
                    to="/new-arrivals"
                    className="border border-gray-300 text-gray-700 text-sm font-semibold px-8 py-3 rounded-lg hover:border-[#ea2e0e] hover:text-[#ea2e0e] transition-colors duration-200"
                >
                    View All
                </Link>
            </div>

        </section>
    )
}

export default NewArrivals
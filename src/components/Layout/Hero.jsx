import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/hero.jpg'

const Hero = () => {
    return (
        <section className="relative bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-16 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">


                <div className="flex flex-col gap-6 max-w-lg text-center md:text-left">


                   <span className="inline-block self-center md:self-start bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                      2025 Collection
                    </span>


                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Dress to <span className="text-[#ea2e0e]">Impress</span> Every Day
                    </h1>


                    <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                        Discover the latest trends in men's and women's fashion. Premium quality clothing designed for modern living.
                    </p>


                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                        <Link
                            to="/men"
                            className="w-full sm:w-auto bg-[#ea2e0e] text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 text-center"
                        >
                            Shop Men
                        </Link>
                        <Link
                            to="/women"
                            className="w-full sm:w-auto border border-gray-300 text-gray-700 text-sm font-semibold px-8 py-3 rounded-lg hover:border-[#ea2e0e] hover:text-[#ea2e0e] transition-colors duration-200 text-center"
                        >
                            Shop Women
                        </Link>
                    </div>


                    <div className="flex items-center justify-center md:justify-start gap-8 mt-4 border-t border-gray-200 pt-6">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-2xl font-extrabold text-gray-900">10k+</span>
                            <span className="text-xs text-gray-500">Products</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200" />
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-2xl font-extrabold text-gray-900">50k+</span>
                            <span className="text-xs text-gray-500">Customers</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200" />
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-2xl font-extrabold text-gray-900">4.9★</span>
                            <span className="text-xs text-gray-500">Rating</span>
                        </div>
                    </div>

                </div>


                <div className="relative w-full max-w-sm md:max-w-lg shrink-0">
                    <div className="absolute inset-0 bg-[#ea2e0e] opacity-10 rounded-3xl blur-3xl" />
                    <img
                        src={heroImage}
                        alt="Hero Fashion"
                        className="relative w-full h-auto object-cover rounded-3xl shadow-2xl"
                    />
                </div>

            </div>
        </section>
    )
}

export default Hero
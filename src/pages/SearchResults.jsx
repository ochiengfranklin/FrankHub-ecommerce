import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import allProducts from '../data/products'

const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    const results = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-10">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Search
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900">
                    Results for <span className="text-[#ea2e0e]">"{query}"</span>
                </h2>
                <p className="text-gray-500 text-sm">{results.length} product{results.length !== 1 ? 's' : ''} found</p>
            </div>

            {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <p className="text-gray-500 text-sm font-medium">No products matched your search.</p>
                    <Link to="/" className="text-xs text-[#ea2e0e] font-semibold hover:underline">
                        Back to Home
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((product) => (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="group flex flex-col gap-3"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
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
            )}
        </section>
    )
}

export default SearchResults
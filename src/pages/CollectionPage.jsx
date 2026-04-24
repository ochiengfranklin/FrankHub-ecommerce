import React, { useState, useMemo, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../api/axios'

const titleMap = {
    men: "Men's Collection",
    women: "Women's Collection",
    topwear: "Top Wear",
    bottomwear: "Bottom Wear",
}

const categoryMap = {
    men: "Men's",
    women: "Women's",
    topwear: "Top Wear",
    bottomwear: "Bottom Wear",
}

const CollectionPage = () => {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState('default')
    const [priceRange, setPriceRange] = useState('all')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const { data } = await API.get('/products')
                setProducts(data)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [category])

    const filtered = useMemo(() => {
        let result = products.filter((p) =>
            p.category.toLowerCase().includes(categoryMap[category]?.toLowerCase() || '')
        )

        if (priceRange === 'under30') result = result.filter(p => p.price < 30)
        else if (priceRange === '30to50') result = result.filter(p => p.price >= 30 && p.price <= 50)
        else if (priceRange === 'over50') result = result.filter(p => p.price > 50)

        if (sort === 'lowToHigh') result = [...result].sort((a, b) => a.price - b.price)
        else if (sort === 'highToLow') result = [...result].sort((a, b) => b.price - a.price)
        else if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name))

        return result
    }, [products, category, sort, priceRange])

    const title = titleMap[category] || 'All Products'

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="h-8 w-8 border-4 border-[#ea2e0e] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-10">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Collection
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900">
                    {title.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-[#ea2e0e]">{title.split(' ').slice(-1)}</span>
                </h2>
                <p className="text-gray-500 text-sm max-w-md">
                    Browse our curated selection of {title.toLowerCase()} pieces.
                </p>
            </div>

            {/* Filters & Sort */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-700">Price:</span>
                    {[
                        { label: 'All', value: 'all' },
                        { label: 'Under $30', value: 'under30' },
                        { label: '$30 – $50', value: '30to50' },
                        { label: 'Over $50', value: 'over50' },
                    ].map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setPriceRange(opt.value)}
                            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors duration-200 cursor-pointer ${
                                priceRange === opt.value
                                    ? 'bg-[#ea2e0e] text-white border-[#ea2e0e]'
                                    : 'border-gray-300 text-gray-600 hover:border-[#ea2e0e] hover:text-[#ea2e0e]'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#ea2e0e] text-gray-600 cursor-pointer"
                >
                    <option value="default">Sort: Default</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="name">Name: A – Z</option>
                </select>
            </div>

            {/* Product Count */}
            <p className="text-xs text-gray-400 mb-6">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

            {/* Product Grid */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <p className="text-gray-500 text-sm font-medium">No products found for this filter.</p>
                    <button
                        onClick={() => { setSort('default'); setPriceRange('all') }}
                        className="text-xs text-[#ea2e0e] font-semibold hover:underline cursor-pointer"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((product) => (
                        <Link
                            to={`/product/${product._id}`}
                            key={product._id}
                            className="group flex flex-col gap-3"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                                <img
                                    src={product.images[0]?.url}
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

export default CollectionPage
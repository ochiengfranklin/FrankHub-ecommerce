import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import allProducts from '../data/products'

const ProductDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const product = allProducts.find((p) => p.id === parseInt(id))

    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [added, setAdded] = useState(false)
    const [error, setError] = useState('')

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-gray-500 text-lg font-medium">Product not found.</p>
                <button onClick={() => navigate('/')} className="text-sm text-[#ea2e0e] font-semibold hover:underline">
                    Back to Home
                </button>
            </div>
        )
    }

    const handleAddToCart = () => {
        if (!selectedSize) { setError('Please select a size.'); return }
        if (!selectedColor) { setError('Please select a color.'); return }
        setError('')
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
        }))
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <section className="container mx-auto px-4 md:px-16 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Image */}
                <div className="rounded-2xl overflow-hidden bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover" />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{product.category}</span>
                        <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{product.name}</h1>
                        <p className="text-2xl font-bold text-[#ea2e0e] mt-2">${product.price}</p>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>

                    {/* Size Selector */}
                    <div>
                        <p className="text-sm font-semibold text-gray-800 mb-2">Size</p>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 text-sm rounded-lg border font-medium transition-colors duration-200 cursor-pointer ${
                                        selectedSize === size
                                            ? 'border-[#ea2e0e] text-[#ea2e0e] bg-red-50'
                                            : 'border-gray-300 text-gray-600 hover:border-[#ea2e0e] hover:text-[#ea2e0e]'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selector */}
                    <div>
                        <p className="text-sm font-semibold text-gray-800 mb-2">Color</p>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 text-sm rounded-lg border font-medium transition-colors duration-200 cursor-pointer ${
                                        selectedColor === color
                                            ? 'border-[#ea2e0e] text-[#ea2e0e] bg-red-50'
                                            : 'border-gray-300 text-gray-600 hover:border-[#ea2e0e] hover:text-[#ea2e0e]'
                                    }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Error */}
                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                            added
                                ? 'bg-green-500 text-white'
                                : 'bg-[#ea2e0e] text-white hover:bg-red-700'
                        }`}
                    >
                        {added ? '✓ Added to Cart' : 'Add to Cart'}
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 text-center"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail
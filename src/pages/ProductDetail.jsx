import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

const allProducts = [
    { id: 1, name: 'Classic White T-Shirt', category: "Men's Top Wear", price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', sizes: ['S', 'M', 'L', 'XL'], colors: ['White'], description: 'A timeless classic white t-shirt made from 100% premium cotton. Perfect for any casual occasion.' },
    { id: 2, name: 'Slim Fit Jeans', category: "Men's Bottom Wear", price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', sizes: ['30', '32', '34', '36'], colors: ['Blue', 'Black'], description: 'Modern slim fit jeans with a comfortable stretch fabric. Versatile enough for any outfit.' },
    { id: 3, name: 'Floral Summer Dress', category: "Women's Top Wear", price: 49.99, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80', sizes: ['XS', 'S', 'M', 'L'], colors: ['Floral'], description: 'A light and breezy floral summer dress perfect for warm days and casual outings.' },
    { id: 4, name: 'High Waist Trousers', category: "Women's Bottom Wear", price: 44.99, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Beige'], description: 'Elegant high waist trousers that offer both style and comfort for any occasion.' },
    { id: 5, name: 'Polo Shirt', category: "Men's Top Wear", price: 34.99, image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80', sizes: ['S', 'M', 'L', 'XL'], colors: ['Navy', 'White', 'Red'], description: 'A classic polo shirt that blends smart and casual effortlessly.' },
    { id: 6, name: 'Denim Skirt', category: "Women's Bottom Wear", price: 39.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', sizes: ['XS', 'S', 'M', 'L'], colors: ['Blue'], description: 'A stylish denim skirt that pairs well with almost any top.' },
    { id: 7, name: 'Linen Shirt', category: "Men's Top Wear", price: 37.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Beige'], description: 'A breathable linen shirt ideal for warm weather and relaxed occasions.' },
    { id: 8, name: 'Pleated Midi Skirt', category: "Women's Bottom Wear", price: 42.99, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Pink'], description: 'An elegant pleated midi skirt that adds a touch of sophistication to any outfit.' },
]

const ProductDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const product = allProducts.find((p) => p.id === parseInt(id))

    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
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
                <div className="flex flex-col gap-6 justify-center">
                    <div>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{product.category}</span>
                        <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{product.name}</h1>
                        <p className="text-2xl font-bold text-[#ea2e0e] mt-2">${product.price}</p>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>

                    {/* Size */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
                        <div className="flex gap-2 flex-wrap">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 cursor-pointer ${
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

                    {/* Color */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Color</p>
                        <div className="flex gap-2 flex-wrap">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 cursor-pointer ${
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


                    {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                    {/* Add to Cart */}
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

                    <button onClick={() => navigate(-1)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        ← Back
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail
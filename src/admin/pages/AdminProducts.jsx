import React, { useEffect, useState } from 'react'
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineX } from 'react-icons/hi'
import API from '../../api/axios'

const emptyForm = {
    name: '', description: '', price: '', category: '',
    sizes: '', colors: '', isNewArrival: false, isFeatured: false,
}

const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [images, setImages] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products')
            setProducts(data)
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchProducts() }, [])

    const openCreate = () => {
        setEditProduct(null)
        setForm(emptyForm)
        setImages([])
        setError('')
        setShowModal(true)
    }

    const openEdit = (product) => {
        setEditProduct(product)
        setForm({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            sizes: product.sizes.join(', '),
            colors: product.colors.join(', '),
            isNewArrival: product.isNewArrival,
            isFeatured: product.isFeatured,
        })
        setImages([])
        setError('')
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return
        try {
            await API.delete(`/products/${id}`)
            setProducts(products.filter((p) => p._id !== id))
        } catch (error) {
            console.error('Failed to delete product:', error)
        }
    }

    const handleSubmit = async () => {
        if (!form.name || !form.description || !form.price || !form.category || !form.sizes || !form.colors) {
            setError('Please fill in all fields.')
            return
        }
        try {
            setSubmitting(true)
            setError('')

            const formData = new FormData()
            formData.append('name', form.name)
            formData.append('description', form.description)
            formData.append('price', form.price)
            formData.append('category', form.category)
            formData.append('sizes', JSON.stringify(form.sizes.split(',').map((s) => s.trim())))
            formData.append('colors', JSON.stringify(form.colors.split(',').map((c) => c.trim())))
            formData.append('isNewArrival', form.isNewArrival)
            formData.append('isFeatured', form.isFeatured)
            images.forEach((img) => formData.append('images', img))

            if (editProduct) {
                await API.put(`/products/${editProduct._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
            } else {
                await API.post('/products', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
            }

            setShowModal(false)
            fetchProducts()
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="h-8 w-8 border-4 border-[#ea2e0e] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Products</h1>
                    <p className="text-sm text-gray-500 mt-1">{products.length} products total</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-[#ea2e0e] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                >
                    <HiOutlinePlus className="h-4 w-4" />
                    Add Product
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <th className="text-left px-6 py-4">Product</th>
                            <th className="text-left px-6 py-4">Category</th>
                            <th className="text-left px-6 py-4">Price</th>
                            <th className="text-left px-6 py-4">New Arrival</th>
                            <th className="text-left px-6 py-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.images[0]?.url}
                                            alt={product.name}
                                            className="h-10 w-10 rounded-lg object-cover border border-gray-100"
                                        />
                                        <span className="font-semibold text-gray-800">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">${product.price}</td>
                                <td className="px-6 py-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${product.isNewArrival ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                                            {product.isNewArrival ? 'Yes' : 'No'}
                                        </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEdit(product)}
                                            className="text-gray-400 hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer"
                                        >
                                            <HiOutlinePencil className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                                        >
                                            <HiOutlineTrash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-4">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editProduct ? 'Edit Product' : 'Add Product'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                <HiOutlineX className="h-5 w-5" />
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-500 text-xs font-medium px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <div className="flex flex-col gap-3">
                            {[
                                { name: 'name', placeholder: 'Product Name' },
                                { name: 'price', placeholder: 'Price', type: 'number' },
                                { name: 'sizes', placeholder: 'Sizes (e.g. S, M, L, XL)' },
                                { name: 'colors', placeholder: 'Colors (e.g. Red, Blue)' },
                            ].map(({ name, placeholder, type }) => (
                                <input
                                    key={name}
                                    name={name}
                                    type={type || 'text'}
                                    placeholder={placeholder}
                                    value={form[name]}
                                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                    className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-[#ea2e0e]"
                                />
                            ))}

                            <select
                                name="category"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-[#ea2e0e] text-gray-600"
                            >
                                <option value="">Select Category</option>
                                <option value="Men's Top Wear">Men's Top Wear</option>
                                <option value="Men's Bottom Wear">Men's Bottom Wear</option>
                                <option value="Women's Top Wear">Women's Top Wear</option>
                                <option value="Women's Bottom Wear">Women's Bottom Wear</option>
                            </select>

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={3}
                                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-[#ea2e0e] resize-none"
                            />

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isNewArrival}
                                        onChange={(e) => setForm({ ...form, isNewArrival: e.target.checked })}
                                        className="accent-[#ea2e0e]"
                                    />
                                    New Arrival
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isFeatured}
                                        onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                                        className="accent-[#ea2e0e]"
                                    />
                                    Featured
                                </label>
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 font-medium mb-1 block">Product Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setImages(Array.from(e.target.files))}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#ea2e0e] file:text-white hover:file:bg-red-700 cursor-pointer"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full bg-[#ea2e0e] text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60"
                        >
                            {submitting ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProducts
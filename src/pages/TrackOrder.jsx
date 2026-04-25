import React, { useState } from 'react'
import { HiOutlineSearch, HiOutlineTruck, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle } from 'react-icons/hi'
import API from '../api/axios'

const statusSteps = ['processing', 'shipped', 'delivered']

const statusColor = (status) => {
    if (status === 'delivered') return 'text-green-500 bg-green-50 border-green-200'
    if (status === 'processing') return 'text-amber-500 bg-amber-50 border-amber-200'
    if (status === 'shipped') return 'text-blue-500 bg-blue-50 border-blue-200'
    if (status === 'cancelled') return 'text-red-500 bg-red-50 border-red-200'
    return 'text-gray-500 bg-gray-100 border-gray-200'
}

const statusIcon = (status) => {
    if (status === 'delivered') return <HiOutlineCheckCircle className="h-5 w-5 text-green-500" />
    if (status === 'shipped') return <HiOutlineTruck className="h-5 w-5 text-blue-500" />
    if (status === 'cancelled') return <HiOutlineXCircle className="h-5 w-5 text-red-500" />
    return <HiOutlineClock className="h-5 w-5 text-amber-500" />
}

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('')
    const [order, setOrder] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleTrack = async () => {
        if (!orderId.trim()) { setError('Please enter an order ID.'); return }
        try {
            setLoading(true)
            setError('')
            setOrder(null)
            const { data } = await API.get(`/orders/${orderId.trim()}`)
            setOrder(data)
        } catch (err) {
            setError('Order not found. Please check your order ID and try again.')
        } finally {
            setLoading(false)
        }
    }

    const currentStep = statusSteps.indexOf(order?.orderStatus)

    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Track
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Track Your <span className="text-[#ea2e0e]">Order</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                    Enter your order ID below to get real-time updates on your order status.
                </p>
            </div>

            {/* Search */}
            <div className="max-w-lg mx-auto flex flex-col gap-3 mb-12">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter your order ID"
                        value={orderId}
                        onChange={(e) => { setOrderId(e.target.value); setError('') }}
                        className="flex-1 text-sm px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-[#ea2e0e]"
                    />
                    <button
                        onClick={handleTrack}
                        disabled={loading}
                        className="bg-[#ea2e0e] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >
                        <HiOutlineSearch className="h-4 w-4" />
                        {loading ? 'Tracking...' : 'Track'}
                    </button>
                </div>
                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                <p className="text-xs text-gray-400 text-center">
                    You can find your order ID in your confirmation email or profile page.
                </p>
            </div>

            {/* Order Result */}
            {order && (
                <div className="max-w-2xl mx-auto flex flex-col gap-6">

                    {/* Order Info */}
                    <div className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div>
                                <p className="text-xs text-gray-400">Order ID</p>
                                <p className="text-sm font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Date</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Total</p>
                                <p className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</p>
                            </div>
                            <div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${statusColor(order.orderStatus)}`}>
                                    {statusIcon(order.orderStatus)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {order.orderStatus !== 'cancelled' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-sm font-bold text-gray-900 mb-6">Order Progress</h2>
                            <div className="flex items-center justify-between relative">
                                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0">
                                    <div
                                        className="h-full bg-[#ea2e0e] transition-all duration-500"
                                        style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                                    />
                                </div>
                                {statusSteps.map((step, index) => (
                                    <div key={step} className="flex flex-col items-center gap-2 z-10">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                                            index <= currentStep
                                                ? 'bg-[#ea2e0e] border-[#ea2e0e] text-white'
                                                : 'bg-white border-gray-300 text-gray-400'
                                        }`}>
                                            {index <= currentStep ? '✓' : index + 1}
                                        </div>
                                        <span className={`text-xs font-medium capitalize ${index <= currentStep ? 'text-[#ea2e0e]' : 'text-gray-400'}`}>
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Order Items */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-sm font-bold text-gray-900 mb-4">Items Ordered</h2>
                        <div className="flex flex-col gap-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-14 w-14 object-cover rounded-lg border border-gray-100 shrink-0"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-400">{item.size} · {item.color} · Qty: {item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-sm font-bold text-gray-900 mb-3">Shipping Address</h2>
                        <p className="text-sm text-gray-500">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                            {order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                            {order.shippingAddress.country}
                        </p>
                    </div>

                </div>
            )}
        </section>
    )
}

export default TrackOrder
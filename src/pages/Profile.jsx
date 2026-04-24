import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineLocationMarker, HiOutlineLogout } from 'react-icons/hi'
import API from '../api/axios'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (!storedUser) { navigate('/login'); return }

        const fetchData = async () => {
            try {
                const [profileRes, ordersRes] = await Promise.all([
                    API.get('/auth/profile'),
                    API.get('/orders/my-orders'),
                ])
                setUser(profileRes.data)
                setOrders(ordersRes.data)
            } catch (error) {
                console.error('Failed to fetch profile:', error)
                navigate('/login')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    const statusColor = (status) => {
        if (status === 'delivered') return 'text-green-500 bg-green-50'
        if (status === 'processing') return 'text-amber-500 bg-amber-50'
        if (status === 'shipped') return 'text-blue-500 bg-blue-50'
        if (status === 'cancelled') return 'text-red-500 bg-red-50'
        return 'text-gray-500 bg-gray-100'
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="h-8 w-8 border-4 border-[#ea2e0e] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <section className="container mx-auto px-4 md:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left — User Info */}
                <div className="flex flex-col gap-6">

                    {/* Avatar & Name */}
                    <div className="flex flex-col items-center gap-3 bg-gray-50 rounded-2xl p-6 text-center">
                        <div className="h-20 w-20 rounded-full bg-[#ea2e0e] flex items-center justify-center text-white text-2xl font-extrabold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-lg font-extrabold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-400">
                                Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-4 bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <HiOutlineUser className="h-4 w-4" /> Account Details
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-xs text-gray-400">Full Name</p>
                                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Role</p>
                                <p className="text-sm font-medium text-gray-800 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-2">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-[#ea2e0e] hover:text-[#ea2e0e] transition-colors duration-200"
                        >
                            <HiOutlineLocationMarker className="h-4 w-4" />
                            Continue Shopping
                        </Link>
                        <Link
                            to="/checkout"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-[#ea2e0e] hover:text-[#ea2e0e] transition-colors duration-200"
                        >
                            <HiOutlineShoppingBag className="h-4 w-4" />
                            Go to Checkout
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-red-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                        >
                            <HiOutlineLogout className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Right — Order History */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                        <HiOutlineShoppingBag className="h-5 w-5 text-[#ea2e0e]" />
                        Order History
                    </h2>

                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-3 bg-gray-50 rounded-2xl">
                            <HiOutlineShoppingBag className="h-12 w-12 text-gray-300" />
                            <p className="text-sm text-gray-500 font-medium">No orders yet.</p>
                            <Link to="/" className="text-xs text-[#ea2e0e] font-semibold hover:underline">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {orders.map((order) => (
                                <div key={order._id} className="flex items-center justify-between bg-gray-50 rounded-2xl px-6 py-4 gap-4 flex-wrap">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor(order.orderStatus)}`}>
                                        {order.orderStatus}
                                    </span>
                                    <p className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Profile
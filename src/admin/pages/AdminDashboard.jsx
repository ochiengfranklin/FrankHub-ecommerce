import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineClipboardList, HiOutlineUsers, HiOutlineCurrencyDollar } from 'react-icons/hi'
import API from '../../api/axios'

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0,
        pendingOrders: 0,
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, ordersRes] = await Promise.all([
                    API.get('/products'),
                    API.get('/orders'),
                ])

                const orders = ordersRes.data
                const products = productsRes.data

                const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0)
                const pendingOrders = orders.filter((o) => o.orderStatus === 'processing').length

                setStats({
                    totalOrders: orders.length,
                    totalProducts: products.length,
                    totalRevenue,
                    pendingOrders,
                })

                setRecentOrders(orders.slice(0, 5))
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const statusColor = (status) => {
        if (status === 'delivered') return 'text-green-500 bg-green-50'
        if (status === 'processing') return 'text-amber-500 bg-amber-50'
        if (status === 'shipped') return 'text-blue-500 bg-blue-50'
        if (status === 'cancelled') return 'text-red-500 bg-red-50'
        return 'text-gray-500 bg-gray-100'
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="h-8 w-8 border-4 border-[#ea2e0e] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const statCards = [
        { label: 'Total Orders', value: stats.totalOrders, icon: HiOutlineClipboardList, color: 'bg-blue-50 text-blue-500' },
        { label: 'Total Products', value: stats.totalProducts, icon: HiOutlineShoppingBag, color: 'bg-purple-50 text-purple-500' },
        { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: HiOutlineCurrencyDollar, color: 'bg-green-50 text-green-500' },
        { label: 'Pending Orders', value: stats.pendingOrders, icon: HiOutlineUsers, color: 'bg-amber-50 text-amber-500' },
    ]

    return (
        <div className="flex flex-col gap-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome back, here's what's happening.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium">{label}</p>
                            <p className="text-xl font-extrabold text-gray-900">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Orders</h2>

                {recentOrders.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">No orders yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                <th className="text-left pb-3">Order ID</th>
                                <th className="text-left pb-3">Customer</th>
                                <th className="text-left pb-3">Date</th>
                                <th className="text-left pb-3">Total</th>
                                <th className="text-left pb-3">Status</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                            {recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td className="py-3 font-semibold text-gray-800">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="py-3 text-gray-600">{order.user?.name || 'N/A'}</td>
                                    <td className="py-3 text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="py-3 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                                    <td className="py-3">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
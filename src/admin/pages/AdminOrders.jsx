import React, { useEffect, useState } from 'react'
import API from '../../api/axios'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders')
                setOrders(data)
            } catch (error) {
                console.error('Failed to fetch orders:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const handleStatusChange = async (id, orderStatus) => {
        try {
            setUpdating(id)
            const { data } = await API.put(`/orders/${id}`, { orderStatus })
            setOrders(orders.map((o) => (o._id === id ? data : o)))
        } catch (error) {
            console.error('Failed to update order:', error)
        } finally {
            setUpdating(null)
        }
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
            <div className="flex justify-center items-center h-full">
                <div className="h-8 w-8 border-4 border-[#ea2e0e] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Orders</h1>
                <p className="text-sm text-gray-500 mt-1">{orders.length} orders total</p>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <th className="text-left px-6 py-4">Order ID</th>
                            <th className="text-left px-6 py-4">Customer</th>
                            <th className="text-left px-6 py-4">Date</th>
                            <th className="text-left px-6 py-4">Total</th>
                            <th className="text-left px-6 py-4">Payment</th>
                            <th className="text-left px-6 py-4">Status</th>
                            <th className="text-left px-6 py-4">Update</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                                    No orders yet.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {order.user?.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 capitalize text-gray-500">
                                        {order.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={updating === order._id}
                                            className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:ring-1 focus:ring-[#ea2e0e] text-gray-600 cursor-pointer disabled:opacity-50"
                                        >
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders
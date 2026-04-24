import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineHome, HiOutlineShoppingBag, HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi'

const links = [
    { label: 'Dashboard', path: '/admin', icon: HiOutlineHome },
    { label: 'Products', path: '/admin/products', icon: HiOutlineShoppingBag },
    { label: 'Orders', path: '/admin/orders', icon: HiOutlineClipboardList },
]

const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <aside className="w-64 bg-white shadow-sm flex flex-col h-full">

            {/* Logo */}
            <div className="px-6 py-5 border-b border-gray-100">
                <Link to="/" className="text-xl font-extrabold tracking-tight text-[#ea2e0e]">
                    Frank<span className="text-gray-900">Hub</span>
                    <span className="ml-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">Admin</span>
                </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col px-4 py-6 gap-2 flex-1">
                {links.map(({ label, path, icon: Icon }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                            location.pathname === path
                                ? 'bg-[#ea2e0e] text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        <Icon className="h-5 w-5" />
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer w-full"
                >
                    <HiOutlineLogout className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
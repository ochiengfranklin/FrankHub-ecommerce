import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2'
import { HiOutlineX, HiOutlineLogout, HiOutlineClipboardList, HiOutlineCog } from 'react-icons/hi'
import CartDrawer from "../Layout/CartDrawer.jsx"
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [user, setUser] = useState(null)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()

    const cartItems = useSelector((state) => state.cart.items)
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) setUser(JSON.parse(stored))
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        setDropdownOpen(false)
        navigate('/login')
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-16 py-4 flex items-center justify-between relative">

                <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#ea2e0e] shrink-0">
                    Frank<span className="text-gray-900">Hub</span>
                </Link>

                <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    <li><Link to="/men" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Men</Link></li>
                    <li><Link to="/women" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Women</Link></li>
                    <li><Link to="/topwear" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Top Wear</Link></li>
                    <li><Link to="/bottomwear" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Bottom Wear</Link></li>
                </ul>

                <div className="flex items-center gap-4">

                    {/* Profile / Auth */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <div className="h-8 w-8 rounded-full bg-[#ea2e0e] flex items-center justify-center text-white text-xs font-extrabold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden md:block text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                                    {user.name?.split(' ')[0]}
                                </span>
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-xs font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    <div className="flex flex-col py-1">
                                        <Link
                                            to="/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#ea2e0e] transition-colors duration-200"
                                        >
                                            <HiOutlineClipboardList className="h-4 w-4" />
                                            My Orders
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#ea2e0e] transition-colors duration-200"
                                            >
                                                <HiOutlineCog className="h-4 w-4" />
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer w-full text-left"
                                        >
                                            <HiOutlineLogout className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" aria-label="Login" className="text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            <HiOutlineUser className="h-6 w-6" />
                        </Link>
                    )}

                    {/* Cart */}
                    <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                        <HiOutlineShoppingBag className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#ea2e0e] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Search */}
                    <SearchBar />

                    {/* Mobile Menu */}
                    <button aria-label="Toggle menu" onClick={() => setMenuOpen(true)} className="md:hidden text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                        <HiBars3BottomRight className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setMenuOpen(false)} />}

            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <span className="text-lg font-extrabold text-[#ea2e0e]">Frank<span className="text-gray-900">Hub</span></span>
                    <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer">
                        <HiOutlineX className="h-6 w-6" />
                    </button>
                </div>
                <ul className="flex flex-col px-6 py-6 gap-6">
                    <li><Link to="/men" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Men</Link></li>
                    <li><Link to="/women" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Women</Link></li>
                    <li><Link to="/topwear" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Top Wear</Link></li>
                    <li><Link to="/bottomwear" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Bottom Wear</Link></li>
                    {user ? (
                        <>
                            <li><Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">My Orders</Link></li>
                            {user.role === 'admin' && (
                                <li><Link to="/admin" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Admin Dashboard</Link></li>
                            )}
                            <li>
                                <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Login</Link></li>
                            <li><Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>

            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </nav>
    )
}

export default Navbar
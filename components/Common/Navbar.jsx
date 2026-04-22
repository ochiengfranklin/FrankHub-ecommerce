import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2'
import CartDrawer from "../Layout/CartDrawer.jsx"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-16 py-4 flex items-center justify-between relative">

                <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#ea2e0e] shrink-0">
                    Frank<span className="text-gray-900">Hub</span>
                </Link>

                <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    <li>
                        <Link to="/men" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Men
                        </Link>
                    </li>
                    <li>
                        <Link to="/women" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Women
                        </Link>
                    </li>
                    <li>
                        <Link to="/topwear" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Top Wear
                        </Link>
                    </li>
                    <li>
                        <Link to="/bottomwear" className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Bottom Wear
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center gap-4">
                    <SearchBar />

                    <Link to="/profile" aria-label="Profile" className="text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                        <HiOutlineUser className="h-6 w-6" />
                    </Link>

                    <button
                        onClick={() => setCartOpen(true)}
                        aria-label="Cart"
                        className="relative text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200"
                    >
                        <HiOutlineShoppingBag className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 bg-[#ea2e0e] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
                    </button>

                    <button
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200"
                    >
                        <HiBars3BottomRight className="h-6 w-6" />
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white border-t border-gray-100">
                    <li>
                        <Link to="/men" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Men
                        </Link>
                    </li>
                    <li>
                        <Link to="/women" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Women
                        </Link>
                    </li>
                    <li>
                        <Link to="/topwear" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Top Wear
                        </Link>
                    </li>
                    <li>
                        <Link to="/bottomwear" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200">
                            Bottom Wear
                        </Link>
                    </li>
                </ul>
            )}

            {/* Cart Drawer */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        </nav>
    )
}

export default Navbar
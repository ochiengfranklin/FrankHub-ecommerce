import React from 'react'
import { Link } from 'react-router-dom'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 md:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <Link to="/" className="text-2xl font-extrabold tracking-tight text-white">
                        Frank<span className="text-[#ea2e0e]">Hub</span>
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Your go-to destination for modern fashion. Quality clothing for men and women.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                        <a href="#" aria-label="Meta" className="hover:text-[#ea2e0e] transition-colors duration-200">
                            <TbBrandMeta className="h-5 w-5" />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-[#ea2e0e] transition-colors duration-200">
                            <RiTwitterXLine className="h-5 w-5" />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-[#ea2e0e] transition-colors duration-200">
                            <IoLogoInstagram className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Shop Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Shop</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link to="/men" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Men's Collection
                            </Link>
                        </li>
                        <li>
                            <Link to="/women" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Women's Collection
                            </Link>
                        </li>
                        <li>
                            <Link to="/topwear" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="/bottomwear" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Bottom Wear
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Support</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link to="/faq" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link to="/shipping" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Shipping & Returns
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/track-order" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Track Order
                            </Link>
                        </li>
                        <li>
                            <a href="tel:+11234567890" className="text-sm hover:text-[#ea2e0e] transition-colors duration-200">
                                Call Us: +1 (123) 456-7890
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Newsletter</h3>
                    <p className="text-sm text-gray-400">
                        Subscribe to get special offers and updates.
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 bg-gray-800 text-sm text-gray-300 placeholder-gray-500 px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-[#ea2e0e]"
                        />
                        <button className="bg-[#ea2e0e] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer shrink-0">
                            Join
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 md:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} FrankHub. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link to="/privacy" className="text-xs text-gray-500 hover:text-[#ea2e0e] transition-colors duration-200">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-xs text-gray-500 hover:text-[#ea2e0e] transition-colors duration-200">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
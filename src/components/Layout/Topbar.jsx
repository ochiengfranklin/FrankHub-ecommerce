import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"

const Topbar = () => {
    return (
        <div className="bg-[#ea2e0e] text-white shadow-md">
            <div className="container mx-auto px-16 py-4 flex items-center justify-between relative">

                <div className="hidden sm:flex items-center gap-4">
                    <a href="#" aria-label="Meta" className="opacity-80 hover:opacity-100 transition-all duration-200">
                        <TbBrandMeta className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="Twitter" className="opacity-80 hover:opacity-100 transition-all duration-200">
                        <RiTwitterXLine className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100 transition-all duration-200">
                        <IoLogoInstagram className="h-4 w-4" />
                    </a>
                </div>

                <p className="text-xs font-medium tracking-widest uppercase absolute left-1/2 -translate-x-1/2 w-full text-center sm:w-auto">
                    Free shipping on orders over $50
                </p>

                <a href="tel:+254797536021" className="hidden sm:block text-xs font-medium tracking-wide opacity-80 hover:opacity-100 transition-all duration-200">
                    +254 797 536 021
                </a>

            </div>
        </div>
    )
}

export default Topbar
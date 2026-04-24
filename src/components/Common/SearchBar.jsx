import React, { useState } from 'react'
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (!query.trim()) return
        setIsOpen(false)
        setQuery('')
        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    const handleClose = () => {
        setIsOpen(false)
        setQuery('')
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open search"
                className="text-gray-700 hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer"
            >
                <HiOutlineSearch className="h-6 w-6" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-24 px-4"
                    onClick={handleClose}
                >
                    <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl p-4" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSearch} className="flex items-center gap-3">
                            <HiOutlineSearch className="h-5 w-5 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for products..."
                                autoFocus
                                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <HiOutlineX className="h-4 w-4" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shrink-0"
                            >
                                Search
                            </button>
                        </form>
                        <button
                            onClick={handleClose}
                            className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            Press ESC or click to close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchBar
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center px-4">
            <h1 className="text-8xl font-extrabold text-[#ea2e0e]">404</h1>
            <h2 className="text-2xl font-extrabold text-gray-900">Page Not Found</h2>
            <p className="text-sm text-gray-500 max-w-sm">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="bg-[#ea2e0e] text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound
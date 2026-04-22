import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

const CartComponents = ({ cartItems = [], onRemove, onIncrease, onDecrease }) => {
    return (
        <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">

                    {/* Product Image */}
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded-lg border border-gray-100 shrink-0"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.size} · {item.color}</p>
                        <p className="text-sm font-bold text-[#ea2e0e] mt-1">${item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onDecrease(item.id)}
                            className="h-6 w-6 rounded-full border border-gray-300 text-gray-600 hover:border-[#ea2e0e] hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer flex items-center justify-center text-sm"
                        >
                            -
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => onIncrease(item.id)}
                            className="h-6 w-6 rounded-full border border-gray-300 text-gray-600 hover:border-[#ea2e0e] hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer flex items-center justify-center text-sm"
                        >
                            +
                        </button>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer"
                    >
                        <HiOutlineTrash className="h-5 w-5" />
                    </button>

                </li>
            ))}
        </ul>
    )
}

export default CartComponents
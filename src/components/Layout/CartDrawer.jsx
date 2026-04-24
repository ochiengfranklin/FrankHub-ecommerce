import React from 'react'
import { HiOutlineX } from 'react-icons/hi'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice'
import CartComponents from '../Cart/CartComponents.jsx'

const CartDrawer = ({ isOpen, onClose }) => {
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose} />
            )}

            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer">
                        <HiOutlineX className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <HiOutlineShoppingBag className="h-16 w-16 text-gray-300" />
                            <p className="text-gray-500 text-sm font-medium">Your cart is empty</p>
                            <button onClick={onClose} className="text-xs text-[#ea2e0e] font-semibold hover:underline cursor-pointer">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <CartComponents
                            cartItems={cartItems}
                            onRemove={(id) => dispatch(removeFromCart(id))}
                            onIncrease={(id) => dispatch(increaseQuantity(id))}
                            onDecrease={(id) => dispatch(decreaseQuantity(id))}
                        />
                    )}
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Subtotal</span>
                        <span className="text-sm font-bold text-gray-900">
                            ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                        </span>
                    </div>
                    <Link
                        to={cartItems.length > 0 ? "/checkout" : "#"}
                        onClick={onClose}
                        className={`w-full text-sm font-semibold py-3 rounded-lg text-center transition-colors duration-200 ${
                            cartItems.length > 0
                                ? "bg-[#ea2e0e] text-white hover:bg-red-700 cursor-pointer"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                        }`}
                    >
                        Checkout
                    </Link>
                    <button onClick={onClose} className="w-full text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </>
    )
}

export default CartDrawer
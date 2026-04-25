import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/cartSlice'
import API from '../api/axios'

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', state: '', zip: '', country: '',
        paymentMethod: 'card',
        cardNumber: '', cardName: '', expiry: '', cvv: '',
    })

    const [errors, setErrors] = useState({})
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            navigate('/login', { state: { from: '/checkout' } })
        }
    }, [])

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = subtotal >= 50 ? 0 : 9.99
    const total = subtotal + shipping

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const validate = () => {
        const newErrors = {}
        if (!form.firstName.trim()) newErrors.firstName = 'Required'
        if (!form.lastName.trim()) newErrors.lastName = 'Required'
        if (!form.email.trim()) newErrors.email = 'Required'
        if (!form.phone.trim()) newErrors.phone = 'Required'
        if (!form.address.trim()) newErrors.address = 'Required'
        if (!form.city.trim()) newErrors.city = 'Required'
        if (!form.state.trim()) newErrors.state = 'Required'
        if (!form.zip.trim()) newErrors.zip = 'Required'
        if (!form.country.trim()) newErrors.country = 'Required'
        if (form.paymentMethod === 'card') {
            if (!form.cardNumber.trim()) newErrors.cardNumber = 'Required'
            if (!form.cardName.trim()) newErrors.cardName = 'Required'
            if (!form.expiry.trim()) newErrors.expiry = 'Required'
            if (!form.cvv.trim()) newErrors.cvv = 'Required'
        }
        return newErrors
    }

    const handleSubmit = async () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) { navigate('/login', { state: { from: '/checkout' } }); return }

        try {
            setLoading(true)
            setServerError('')
            await API.post('/orders', {
                items: cartItems.map((item) => ({
                    product: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                    image: item.image,
                })),
                shippingAddress: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    zip: form.zip,
                    country: form.country,
                },
                paymentMethod: form.paymentMethod,
                subtotal,
                shippingPrice: shipping,
                total,
            })
            dispatch(clearCart())
            setOrderPlaced(true)
        } catch (error) {
            setServerError(error.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-gray-500 text-lg font-medium">Your cart is empty.</p>
                <button onClick={() => navigate('/')} className="text-sm text-[#ea2e0e] font-semibold hover:underline">
                    Back to Home
                </button>
            </div>
        )
    }

    if (orderPlaced) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-500 text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">Order Placed!</h2>
                <p className="text-sm text-gray-500 max-w-sm">
                    Thank you for shopping with FrankHub. Your order has been received and is being processed.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-[#ea2e0e] text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                    Continue Shopping
                </button>
            </div>
        )
    }

    const inputClass = (field) =>
        `w-full text-sm px-4 py-2.5 rounded-lg border outline-none transition-colors duration-200 focus:ring-1 focus:ring-[#ea2e0e] ${
            errors[field] ? 'border-red-400' : 'border-gray-300'
        }`

    return (
        <section className="container mx-auto px-4 md:px-16 py-16">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Checkout</h1>

            {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-500 text-xs font-medium px-4 py-3 rounded-lg mb-6">
                    {serverError}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left — Form */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    {/* Shipping Info */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Shipping Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className={inputClass('firstName')} />
                                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className={inputClass('lastName')} />
                                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                            </div>
                            <div>
                                <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className={inputClass('email')} />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className={inputClass('phone')} />
                                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} className={inputClass('address')} />
                                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                            </div>
                            <div>
                                <input name="city" placeholder="City" value={form.city} onChange={handleChange} className={inputClass('city')} />
                                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                            </div>
                            <div>
                                <input name="state" placeholder="State / Province" value={form.state} onChange={handleChange} className={inputClass('state')} />
                                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                            </div>
                            <div>
                                <input name="zip" placeholder="ZIP / Postal Code" value={form.zip} onChange={handleChange} className={inputClass('zip')} />
                                {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
                            </div>
                            <div>
                                <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className={inputClass('country')} />
                                {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Payment Method</h2>
                        <div className="flex gap-4">
                            {['card', 'paypal', 'cod'].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setForm({ ...form, paymentMethod: method })}
                                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg border transition-colors duration-200 cursor-pointer ${
                                        form.paymentMethod === method
                                            ? 'border-[#ea2e0e] text-[#ea2e0e] bg-red-50'
                                            : 'border-gray-300 text-gray-600 hover:border-[#ea2e0e]'
                                    }`}
                                >
                                    {method === 'card' ? 'Credit Card' : method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
                                </button>
                            ))}
                        </div>

                        {form.paymentMethod === 'card' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <input name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} className={inputClass('cardNumber')} maxLength={19} />
                                    {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <input name="cardName" placeholder="Name on Card" value={form.cardName} onChange={handleChange} className={inputClass('cardName')} />
                                    {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
                                </div>
                                <div>
                                    <input name="expiry" placeholder="MM / YY" value={form.expiry} onChange={handleChange} className={inputClass('expiry')} maxLength={7} />
                                    {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                                </div>
                                <div>
                                    <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} className={inputClass('cvv')} maxLength={4} />
                                    {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                                </div>
                            </div>
                        )}

                        {form.paymentMethod === 'paypal' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-600 font-medium">
                                You will be redirected to PayPal to complete your payment.
                            </div>
                        )}

                        {form.paymentMethod === 'cod' && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 font-medium">
                                Pay with cash when your order is delivered.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right — Order Summary */}
                <div className="flex flex-col gap-4 bg-gray-50 rounded-2xl p-6 h-fit">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">Order Summary</h2>
                    <ul className="flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex items-center gap-3">
                                <img src={item.image} alt={item.name} className="h-14 w-14 object-cover rounded-lg border border-gray-100 shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-400">{item.size} · {item.color} · Qty: {item.quantity}</p>
                                </div>
                                <span className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? <span className="text-green-500 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-2 mt-1">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#ea2e0e] text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60 mt-2"
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                        By placing your order you agree to our{' '}
                        <span className="text-[#ea2e0e] cursor-pointer hover:underline">Terms of Service</span>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Checkout
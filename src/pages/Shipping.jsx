import React from 'react'
import { HiOutlineTruck, HiOutlineRefresh, HiOutlineShieldCheck, HiOutlineClock } from 'react-icons/hi'

const Shipping = () => {
    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Policies
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Shipping & <span className="text-[#ea2e0e]">Returns</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                    Everything you need to know about our shipping and return policies.
                </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                    { icon: HiOutlineTruck, title: 'Free Shipping', desc: 'On all orders over $50' },
                    { icon: HiOutlineClock, title: 'Fast Delivery', desc: '3-7 business days standard' },
                    { icon: HiOutlineRefresh, title: '30-Day Returns', desc: 'Hassle-free return policy' },
                    { icon: HiOutlineShieldCheck, title: 'Secure Payments', desc: 'Your data is always safe' },
                ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex flex-col items-center text-center gap-3 bg-gray-50 rounded-2xl p-6">
                        <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-[#ea2e0e]" />
                        </div>
                        <p className="text-sm font-bold text-gray-900">{title}</p>
                        <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-2xl mx-auto flex flex-col gap-10">

                {/* Shipping Policy */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                        Shipping Policy
                    </h2>
                    <div className="flex flex-col gap-3 text-sm text-gray-500 leading-relaxed">
                        <p>We process all orders within 1-2 business days. Once your order is shipped you will receive a confirmation email with a tracking number.</p>
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                            {[
                                { label: 'Standard Shipping', value: '3-7 business days — Free on orders over $50, otherwise $9.99' },
                                { label: 'Express Shipping', value: '1-2 business days — $19.99' },
                                { label: 'International Shipping', value: '7-14 business days — Rates vary by location' },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex flex-col gap-1">
                                    <p className="text-xs font-bold text-gray-800">{label}</p>
                                    <p className="text-xs text-gray-500">{value}</p>
                                </div>
                            ))}
                        </div>
                        <p>Please note that shipping times may vary during peak seasons and holidays.</p>
                    </div>
                </div>

                {/* Returns Policy */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                        Returns Policy
                    </h2>
                    <div className="flex flex-col gap-3 text-sm text-gray-500 leading-relaxed">
                        <p>We want you to love your purchase. If you're not completely satisfied, we accept returns within 30 days of delivery.</p>
                        <p className="font-semibold text-gray-700">To be eligible for a return, items must be:</p>
                        <ul className="flex flex-col gap-2 pl-4">
                            {[
                                'Unworn and unwashed',
                                'In their original packaging',
                                'Free of any damage or alterations',
                                'Accompanied by the original receipt',
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ea2e0e] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>Once we receive and inspect your return, we will process your refund within 5-7 business days to your original payment method.</p>
                    </div>
                </div>

                {/* Exchanges */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                        Exchanges
                    </h2>
                    <div className="flex flex-col gap-3 text-sm text-gray-500 leading-relaxed">
                        <p>We offer free exchanges for different sizes or colors within 30 days of delivery. To request an exchange, contact our support team with your order number and the item you'd like to exchange.</p>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col gap-2">
                    <p className="text-sm font-bold text-gray-900">Need help with a return?</p>
                    <p className="text-xs text-gray-500">Contact our support team at <span className="text-[#ea2e0e] font-medium">support@frankhub.com</span> or call <span className="text-[#ea2e0e] font-medium">+1 (123) 456-7890</span></p>
                </div>

            </div>
        </section>
    )
}

export default Shipping
import React from 'react'
import { Link } from 'react-router-dom'

const sections = [
    {
        title: 'Acceptance of Terms',
        content: `By accessing and using the FrankHub website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of those changes.`,
    },
    {
        title: 'Use of the Website',
        content: `You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others. You must not use our website to transmit any harmful, offensive, or illegal content. We reserve the right to terminate your access to the website if you violate these terms.`,
    },
    {
        title: 'Account Responsibility',
        content: `When you create an account with us, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.`,
    },
    {
        title: 'Products and Pricing',
        content: `We reserve the right to modify or discontinue any product at any time without notice. Prices for products are subject to change without notice. We shall not be liable to you or any third party for any modification, price change, or discontinuation of products.`,
    },
    {
        title: 'Orders and Payment',
        content: `By placing an order, you represent that you are authorized to use the payment method provided. We reserve the right to refuse or cancel any order for any reason, including if we suspect fraudulent activity. All payments are processed securely through our payment partners.`,
    },
    {
        title: 'Shipping and Delivery',
        content: `We aim to deliver your orders within the timeframes specified at checkout. However, delivery times are estimates and not guaranteed. We are not responsible for delays caused by customs, weather, or other circumstances beyond our control.`,
    },
    {
        title: 'Returns and Refunds',
        content: `Our return and refund policy is outlined in our Shipping & Returns page. By making a purchase, you agree to the terms of that policy. Refunds are processed within 5-7 business days of receiving the returned item.`,
    },
    {
        title: 'Intellectual Property',
        content: `All content on this website, including text, graphics, logos, and images, is the property of FrankHub and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
    },
    {
        title: 'Limitation of Liability',
        content: `FrankHub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability to you for any claim arising from your use of our website shall not exceed the amount you paid for the product in question.`,
    },
    {
        title: 'Governing Law',
        content: `These Terms of Service shall be governed by and construed in accordance with the laws of Kenya. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.`,
    },
    {
        title: 'Contact Us',
        content: `If you have any questions about these Terms of Service, please contact us at support@frankhub.com or call us at +254 797 536 021.`,
    },
]

const TermsOfService = () => {
    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Legal
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Terms of <span className="text-[#ea2e0e]">Service</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>

            {/* Intro */}
            <div className="max-w-2xl mx-auto mb-8">
                <p className="text-sm text-gray-500 leading-relaxed">
                    Welcome to FrankHub. These Terms of Service govern your use of our website and the purchase of products from us. Please read these terms carefully before using our website.
                </p>
            </div>

            {/* Sections */}
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
                {sections.map((section, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        <h2 className="text-base font-bold text-gray-900">
                            {index + 1}. {section.title}
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed">{section.content}</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="max-w-2xl mx-auto mt-12 bg-gray-50 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-500">
                    Have questions about our terms?{' '}
                    <Link to="/contact" className="text-[#ea2e0e] font-semibold hover:underline">
                        Contact Us
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default TermsOfService
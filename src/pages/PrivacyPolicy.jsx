import React from 'react'
import { Link } from 'react-router-dom'

const sections = [
    {
        title: 'Information We Collect',
        content: `We collect information you provide directly to us when you create an account, place an order, or contact us. This includes your name, email address, phone number, shipping address, and payment information. We also collect information automatically when you use our website, such as your IP address, browser type, and browsing behavior.`,
    },
    {
        title: 'How We Use Your Information',
        content: `We use the information we collect to process your orders, send you order confirmations and updates, respond to your comments and questions, send you marketing communications (if you have opted in), improve our website and services, and comply with legal obligations.`,
    },
    {
        title: 'Information Sharing',
        content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.`,
    },
    {
        title: 'Data Security',
        content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted during transmission using SSL technology. However, no method of transmission over the internet is 100% secure.`,
    },
    {
        title: 'Cookies',
        content: `We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our website may not function properly.`,
    },
    {
        title: 'Your Rights',
        content: `You have the right to access, update, or delete your personal information at any time. You can do this by logging into your account or contacting us directly. You also have the right to opt out of marketing communications by clicking the unsubscribe link in any email we send you.`,
    },
    {
        title: 'Children\'s Privacy',
        content: `Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`,
    },
    {
        title: 'Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date. We encourage you to review this policy periodically.`,
    },
    {
        title: 'Contact Us',
        content: `If you have any questions about this Privacy Policy, please contact us at support@frankhub.com or call us at +254 797 536 021.`,
    },
]

const PrivacyPolicy = () => {
    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Legal
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Privacy <span className="text-[#ea2e0e]">Policy</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>

            {/* Intro */}
            <div className="max-w-2xl mx-auto mb-8">
                <p className="text-sm text-gray-500 leading-relaxed">
                    At FrankHub, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
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
                    Have questions about our privacy practices?{' '}
                    <Link to="/contact" className="text-[#ea2e0e] font-semibold hover:underline">
                        Contact Us
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default PrivacyPolicy
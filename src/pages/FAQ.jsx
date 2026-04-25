import React, { useState } from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'

const faqs = [
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept Credit/Debit cards, PayPal, and Cash on Delivery. All card payments are processed securely.',
    },
    {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 3-7 business days. Express shipping (1-2 business days) is available at checkout for an additional fee.',
    },
    {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free standard shipping on all orders over $50.',
    },
    {
        question: 'Can I return or exchange an item?',
        answer: 'Yes. We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging. Visit our Shipping & Returns page for more details.',
    },
    {
        question: 'How do I track my order?',
        answer: 'Once your order is shipped you will receive a tracking number via email. You can also track your order from your account profile page.',
    },
    {
        question: 'What sizes do you carry?',
        answer: 'We carry sizes XS through XXL for most items. Each product page shows the available sizes for that specific item.',
    },
    {
        question: 'Can I cancel or modify my order?',
        answer: 'Orders can be cancelled or modified within 24 hours of placing them. After that the order enters processing and cannot be changed.',
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can reach us via the Contact Us page, by email, or by calling +1 (123) 456-7890. We respond within 24 hours.',
    },
]

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
                <span className="text-sm font-semibold text-gray-800">{question}</span>
                {open
                    ? <HiOutlineChevronUp className="h-4 w-4 text-[#ea2e0e] shrink-0" />
                    : <HiOutlineChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                }
            </button>
            {open && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    )
}

const FAQ = () => {
    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Help Center
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Frequently Asked <span className="text-[#ea2e0e]">Questions</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                    Can't find what you're looking for? Reach out to our support team.
                </p>
            </div>

            {/* FAQ List */}
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>

        </section>
    )
}

export default FAQ
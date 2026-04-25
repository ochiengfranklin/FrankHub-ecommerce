import React, { useState } from 'react'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'
import API from '../api/axios'

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const validate = () => {
        const newErrors = {}
        if (!form.name.trim()) newErrors.name = 'Required'
        if (!form.email.trim()) newErrors.email = 'Required'
        if (!form.subject.trim()) newErrors.subject = 'Required'
        if (!form.message.trim()) newErrors.message = 'Required'
        return newErrors
    }

    const handleSubmit = async () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
        setLoading(true)
        await new Promise((res) => setTimeout(res, 1000))
        setLoading(false)
        setSubmitted(true)
    }

    const inputClass = (field) =>
        `w-full text-sm px-4 py-2.5 rounded-lg border outline-none transition-colors duration-200 focus:ring-1 focus:ring-[#ea2e0e] ${
            errors[field] ? 'border-red-400' : 'border-gray-300'
        }`

    const contactInfo = [
        { icon: HiOutlineMail, label: 'Email', value: 'support@frankhub.com' },
        { icon: HiOutlinePhone, label: 'Phone', value: '+1 (123) 456-7890' },
        { icon: HiOutlineLocationMarker, label: 'Address', value: '123 Fashion Street, New York, NY 10001' },
        { icon: HiOutlineClock, label: 'Working Hours', value: 'Mon - Fri, 9:00 AM - 6:00 PM' },
    ]

    return (
        <section className="container mx-auto px-4 md:px-16 py-16">

            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <span className="bg-[#ea2e0e] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Get In Touch
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Contact <span className="text-[#ea2e0e]">Us</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                    Have a question or need help? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left — Contact Info */}
                <div className="flex flex-col gap-6">
                    {contactInfo.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5">
                            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                <Icon className="h-5 w-5 text-[#ea2e0e]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">{label}</p>
                                <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right — Form */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-500 text-3xl">✓</span>
                            </div>
                            <h2 className="text-xl font-extrabold text-gray-900">Message Sent!</h2>
                            <p className="text-sm text-gray-500 max-w-sm">
                                Thank you for reaching out. We'll get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                                className="text-xs text-[#ea2e0e] font-semibold hover:underline cursor-pointer"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">Send us a message</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        name="name"
                                        placeholder="Full Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={inputClass('name')}
                                    />
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={inputClass('email')}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <input
                                    name="subject"
                                    placeholder="Subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className={inputClass('subject')}
                                />
                                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your message..."
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`${inputClass('message')} resize-none`}
                                />
                                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-[#ea2e0e] text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Contact
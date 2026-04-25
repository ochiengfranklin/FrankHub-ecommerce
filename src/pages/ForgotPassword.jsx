import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!email.trim()) { setError('Please enter your email.'); return }
        try {
            setLoading(true)
            setError('')
            await API.post('/auth/forgot-password', { email })
            setSuccess(true)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">

                {/* Header */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#ea2e0e]">
                        Frank<span className="text-gray-900">Hub</span>
                    </Link>
                    <h1 className="text-xl font-extrabold text-gray-900 mt-2">Forgot Password</h1>
                    <p className="text-sm text-gray-500">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>

                {success ? (
                    <div className="flex flex-col items-center gap-4 text-center py-4">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-500 text-3xl">✓</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">Email Sent!</p>
                        <p className="text-xs text-gray-500">
                            Check your inbox for a password reset link. It expires in 15 minutes.
                        </p>
                        <Link to="/login" className="text-xs text-[#ea2e0e] font-semibold hover:underline">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-500 text-xs font-medium px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError('') }}
                                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-[#ea2e0e]"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-[#ea2e0e] text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                        <p className="text-xs text-gray-500 text-center">
                            Remember your password?{' '}
                            <Link to="/login" className="text-[#ea2e0e] font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ForgotPassword
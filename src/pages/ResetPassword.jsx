import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({ password: '', confirmPassword: '' })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async () => {
        if (!form.password.trim()) { setError('Please enter a new password.'); return }
        if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }

        try {
            setLoading(true)
            setError('')
            await API.put(`/auth/reset-password/${token}`, { password: form.password })
            setSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
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
                    <h1 className="text-xl font-extrabold text-gray-900 mt-2">Reset Password</h1>
                    <p className="text-sm text-gray-500">Enter your new password below.</p>
                </div>

                {success ? (
                    <div className="flex flex-col items-center gap-4 text-center py-4">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-500 text-3xl">✓</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">Password Reset Successful!</p>
                        <p className="text-xs text-gray-500">
                            Redirecting you to login in 3 seconds...
                        </p>
                        <Link to="/login" className="text-xs text-[#ea2e0e] font-semibold hover:underline">
                            Go to Login
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
                                name="password"
                                type="password"
                                placeholder="New Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-[#ea2e0e]"
                            />
                        </div>
                        <div>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm New Password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-1 focus:ring-[#ea2e0e]"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-[#ea2e0e] text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword
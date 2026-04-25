import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import API from '../api/axios'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
        setServerError('')
    }

    const validate = () => {
        const newErrors = {}
        if (!form.email.trim()) newErrors.email = 'Required'
        if (!form.password.trim()) newErrors.password = 'Required'
        return newErrors
    }

    const handleSubmit = async () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
        try {
            setLoading(true)
            const { data } = await API.post('/auth/login', form)
            localStorage.setItem('user', JSON.stringify(data))
            const redirectTo = location.state?.from || '/'
            navigate(redirectTo)
        } catch (error) {
            setServerError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const inputClass = (field) =>
        `w-full text-sm px-4 py-2.5 rounded-lg border outline-none transition-colors duration-200 focus:ring-1 focus:ring-[#ea2e0e] ${
            errors[field] ? 'border-red-400' : 'border-gray-300'
        }`

    return (
        <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">

                {/* Header */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#ea2e0e]">
                        Frank<span className="text-gray-900">Hub</span>
                    </Link>
                    <h1 className="text-xl font-extrabold text-gray-900 mt-2">Welcome back</h1>
                    <p className="text-sm text-gray-500">Sign in to your account to continue</p>
                </div>

                {/* Server Error */}
                {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-500 text-xs font-medium px-4 py-3 rounded-lg">
                        {serverError}
                    </div>
                )}

                {/* Form */}
                <div className="flex flex-col gap-4">
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
                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className={inputClass('password')}
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                            <input type="checkbox" className="accent-[#ea2e0e]" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="text-xs text-[#ea2e0e] hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#ea2e0e] text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google */}
                <button
                    onClick={() => window.location.href = 'https://web-production-e9962.up.railway.app/api/auth/google'}
                    className="w-full border border-gray-300 text-sm font-medium text-gray-700 py-2.5 rounded-lg hover:border-[#ea2e0e] hover:text-[#ea2e0e] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-4 w-4" />
                    Continue with Google
                </button>

                {/* Footer */}
                <p className="text-xs text-gray-500 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#ea2e0e] font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Login
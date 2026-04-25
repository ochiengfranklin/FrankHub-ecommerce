import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Register = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
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
        if (!form.name.trim()) newErrors.name = 'Required'
        if (!form.email.trim()) newErrors.email = 'Required'
        if (!form.password.trim()) newErrors.password = 'Required'
        if (!form.confirmPassword.trim()) newErrors.confirmPassword = 'Required'
        if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        return newErrors
    }

    const handleSubmit = async () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
        try {
            setLoading(true)
            const { data } = await API.post('/auth/register', {
                name: form.name,
                email: form.email,
                password: form.password,
            })
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/')
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
                    <h1 className="text-xl font-extrabold text-gray-900 mt-2">Create an account</h1>
                    <p className="text-sm text-gray-500">Join FrankHub and start shopping</p>
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
                    <div>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className={inputClass('confirmPassword')}
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#ea2e0e] text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-60"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
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
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#ea2e0e] font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Register
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const OAuthSuccess = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const user = searchParams.get('user')
        if (user) {
            localStorage.setItem('user', decodeURIComponent(user))
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="h-8 w-8 border-4 border-[#ea2e0e] border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default OAuthSuccess
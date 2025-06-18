import React from 'react'
import { useAuth } from '../context/AuthContext'
import { AuthLayout } from './auth/AuthLayout'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <AuthLayout />
  }

  return <>{children}</>
}

import React, { useState } from 'react'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

interface AuthLayoutProps {
  onSuccess?: () => void
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false)

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="auth-layout">
      <div className="auth-container">
        {isSignUp ? (
          <SignUp onToggleMode={toggleMode} onSuccess={onSuccess} />
        ) : (
          <SignIn onToggleMode={toggleMode} onSuccess={onSuccess} />
        )}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

interface SignUpProps {
  onToggleMode: () => void
  onSuccess?: () => void
}

export const SignUp: React.FC<SignUpProps> = ({ onToggleMode, onSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      // Call onSuccess to close modal if provided
      if (onSuccess) {
        onSuccess()
      }
    }
    
    setLoading(false)
  }

  if (success) {
    return (
      <div className="auth-form">
        <h2>Check Your Email</h2>
        <p className="success-message">We've sent you a confirmation link. Please check your email and click the link to verify your account.</p>
        <button type="button" onClick={onToggleMode} className="link-button">
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p>
        Already have an account?{' '}
        <button type="button" onClick={onToggleMode} className="link-button">
          Sign In
        </button>
      </p>
    </div>
  )
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from './auth/AuthLayout';

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
      // You could also show a user-friendly error message here
    }
  };

  const handleSignInClick = () => {
    setShowAuthModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <header className="app-header">
        <h1>
          <Link to="/" className="logo-link">Rock Paper Scissors</Link>
        </h1>
        <div className="user-info">
          {user ? (
            <div className="profile-section">
              <div className="profile-info">
                <div className="profile-avatar" onClick={handleProfileClick}>
                  <img src="/profile.svg" alt="Profile" className="avatar-icon" />
                </div>
              </div>
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={handleSignInClick} className="sign-in-btn">
              Sign In
            </button>
          )}
        </div>
      </header>

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={handleCloseModal}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={handleCloseModal}>
              ×
            </button>
            <AuthLayout onSuccess={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
}

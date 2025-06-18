import { useAuth } from '../context/AuthContext';

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h2>Profile</h2>
          <p>Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-content">
          <div className="profile-avatar-large">
            <img src="/profile.svg" alt="Profile" className="avatar-icon-large" />
          </div>
          <div className="profile-info-section">
            <div className="info-group">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-group">
              <label>User ID:</label>
              <span>{user.id}</span>
            </div>
            <div className="info-group">
              <label>Member Since:</label>
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

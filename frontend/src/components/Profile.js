import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../api';

function Profile({ user, onUpdateUser, onLogout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    college: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await users.getMe();
      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        branch: response.data.branch || '',
        college: response.data.college || ''
      });
    } catch (error) {
      console.error('Failed to load profile', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await users.updateMe(formData);
      alert('✅ Profile updated successfully!');
      setIsEditing(false);
      
      // Update user in parent component
      const updatedUser = { ...user, ...formData };
      onUpdateUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      alert(`❌ Failed to update profile: ${error.response?.data?.error || error.message}`);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('❌ Password must be at least 6 characters!');
      return;
    }
    
    try {
      await users.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      alert('✅ Password changed successfully!');
      setShowPasswordChange(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert(`❌ Failed to change password: ${error.response?.data?.error || error.message}`);
    }
  };

  const isAdmin = user.role === 'admin';
  
  return (
    <div className={isAdmin ? "kanban-container" : "container"} style={!isAdmin ? { maxWidth: '700px' } : {}}>
      {isAdmin && (
        <div className="kanban-sidebar">
          <div className="sidebar-logo">
            <img src={require('../images/logo.png')} alt="ProjectHub" />
          </div>
          
          <div className="sidebar-menu">
            <div className="sidebar-section-title">MENU</div>
            <div className="sidebar-item" onClick={(e) => { e.preventDefault(); navigate('/admin/dashboard'); }}>
              <span className="sidebar-item-icon">📊</span>
              <span>Dashboard</span>
            </div>
            <div className="sidebar-item" onClick={(e) => { e.preventDefault(); navigate('/admin/projects'); }}>
              <span className="sidebar-item-icon">📁</span>
              <span>Project</span>
            </div>
            <div className="sidebar-item" onClick={(e) => { e.preventDefault(); navigate('/admin/users'); }}>
              <span className="sidebar-item-icon">👥</span>
              <span>Users</span>
            </div>
            <div className="sidebar-item" onClick={(e) => { e.preventDefault(); navigate('/admin/settings'); }}>
              <span className="sidebar-item-icon">⚙️</span>
              <span>Settings</span>
            </div>
          </div>
          
          <div className="sidebar-menu" style={{ marginTop: '32px' }}>
            <div className="sidebar-section-title">ACCOUNT</div>
            <div className="sidebar-item active">
              <span className="sidebar-item-icon">👤</span>
              <span>Profile</span>
            </div>
            <div className="sidebar-item" onClick={(e) => { e.preventDefault(); navigate('/admin/notifications'); }}>
              <span className="sidebar-item-icon">🔔</span>
              <span>Notification</span>
            </div>
            <div className="sidebar-item" onClick={onLogout} style={{ color: '#dc3545', marginTop: '16px' }}>
              <span className="sidebar-item-icon">🚪</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}

      <div className={isAdmin ? "kanban-main" : ""} style={isAdmin ? { maxWidth: '700px' } : {}}>
      {/* Header */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '16px', 
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        {!isAdmin && (
          <button 
            onClick={() => navigate('/student/dashboard')}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
          >
            ← Back
          </button>
        )}
        <h1 style={{ 
          fontSize: '2.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          👤 My Profile
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Manage your account information
        </p>
      </div>

      {/* Profile Form */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#667eea' }}>📝 Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>👤 Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label>📧 Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={user.role !== 'admin' || !isEditing}
              style={{ background: user.role !== 'admin' || !isEditing ? '#f5f5f5' : 'white' }}
            />
            {user.role !== 'admin' && (
              <small style={{ color: '#666' }}>Email can only be changed by admins</small>
            )}
          </div>

          <div className="form-group">
            <label>📱 Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              disabled={!isEditing}
              placeholder="+91 1234567890"
            />
          </div>

          {user.role === 'requester' && (
            <>
              <div className="form-group">
                <label>🎓 Branch/Department</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  disabled={!isEditing}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="form-group">
                <label>🏫 College/University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                  disabled={!isEditing}
                  placeholder="e.g., ABC University"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>🎯 Role</label>
            <input
              type="text"
              value={user.role === 'requester' ? 'Student' : user.role === 'admin' ? 'Admin' : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              disabled
              style={{ background: '#f5f5f5' }}
            />
          </div>

          {isEditing ? (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                💾 Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  loadProfile();
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                ❌ Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              ✏️ Edit Profile
            </button>
          )}
        </form>
      </div>

      {/* Password Change Section */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#667eea' }}>🔒 Change Password</h2>
        
        {!showPasswordChange ? (
          <button
            type="button"
            onClick={() => setShowPasswordChange(true)}
            className="btn btn-warning"
            style={{ width: '100%' }}
          >
            🔑 Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>🔐 Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                placeholder="Enter your current password"
                required
              />
            </div>

            <div className="form-group">
              <label>🆕 New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                placeholder="Enter new password (min 6 characters)"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label>✅ Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
                required
                minLength={6}
              />
            </div>

            <div className="info-box info-box-warning" style={{ marginBottom: '1rem' }}>
              <strong>⚠️ Password Requirements:</strong>
              <ul style={{ marginTop: '0.5rem', marginBottom: 0, paddingLeft: '1.5rem' }}>
                <li>Minimum 6 characters</li>
                <li>Make sure both passwords match</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                💾 Update Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}

export default Profile;

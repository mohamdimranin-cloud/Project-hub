import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notifications } from '../api';
import logo from '../images/logo.png';

function Navbar({ user, onLogout }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await notifications.getAll();
      const unread = response.data.filter(n => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Failed to load notifications', error);
    }
  };

  const baseUrl = user.role === 'admin' ? '/admin' : '/student';

  return (
    <nav className="nav">
      <div className="nav-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to={baseUrl} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src={logo} 
              alt="ProjectHub" 
              style={{ 
                height: '40px', 
                width: 'auto'
              }} 
            />
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
          {user.role === 'admin' ? (
            <>
              <Link to="/admin/dashboard" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff', fontWeight: '500' }}>
                Dashboard
              </Link>
              <Link to="/admin/projects" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
                Projects
              </Link>
              <Link to="/admin/users" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
                Users
              </Link>
              <Link to="/admin/settings" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
                Settings
              </Link>
              <Link to="/admin/notifications" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff', position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                🔔 Notifications
                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link to="/student/dashboard" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                Dashboard
              </Link>
              <Link to="/student/projects" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
                My Projects
              </Link>
              <Link to="/student/notifications" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333', position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                🔔 Notifications
                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </>
          )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to={`${baseUrl}/profile`} style={{ textDecoration: 'none', color: '#333' }}>
            {user.name} ({user.role})
          </Link>
          <button onClick={onLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

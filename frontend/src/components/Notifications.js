import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../api';

function Notifications({ user, onLogout }) {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await notifications.getAll();
      setNotificationList(response.data);
    } catch (error) {
      console.error('Failed to load notifications', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notifications.markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notifications.markAllAsRead();
      loadNotifications();
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.projectId) {
      navigate(`/projects/${notification.projectId}`);
    }
    if (!notification.read) {
      handleMarkAsRead(notification._id);
    }
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  const isAdmin = user?.role === 'admin';
  
  return (
    <div className={isAdmin ? "kanban-container" : "container"}>
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
            <div className="sidebar-item" onClick={(e) => { e.preventDefault(); navigate('/admin/profile'); }}>
              <span className="sidebar-item-icon">👤</span>
              <span>Profile</span>
            </div>
            <div className="sidebar-item active">
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

      <div className={isAdmin ? "kanban-main" : ""}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        {!isAdmin && (
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem' }}
          >
            ← Back
          </button>
        )}
        <h1 style={{ margin: 0 }}>Notifications ({unreadCount} unread)</h1>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllAsRead} className="btn btn-secondary" style={{ marginLeft: 'auto' }}>
            Mark All as Read
          </button>
        )}
      </div>

      {notificationList.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#666' }}>No notifications yet</p>
        </div>
      ) : (
        notificationList.map(notification => (
          <div
            key={notification._id}
            className="card"
            onClick={() => handleNotificationClick(notification)}
            style={{
              cursor: 'pointer',
              background: notification.read ? 'white' : '#e7f5ff',
              borderLeft: notification.read ? 'none' : '4px solid #007bff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                  {notification.message}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
              {!notification.read && (
                <span style={{
                  width: '10px',
                  height: '10px',
                  background: '#007bff',
                  borderRadius: '50%',
                  marginLeft: '1rem'
                }}></span>
              )}
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}

export default Notifications;

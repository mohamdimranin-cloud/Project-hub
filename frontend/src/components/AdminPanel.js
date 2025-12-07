import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../api';

function AdminPanel({ onLogout }) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await users.getAll();
      setUserList(response.data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoading(false);
    }
  };



  const filteredUsers = filter === 'all' 
    ? userList 
    : userList.filter(user => user.role === filter);

  const stats = {
    total: userList.length,
    requesters: userList.filter(u => u.role === 'requester').length,
    admins: userList.filter(u => u.role === 'admin').length,
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="kanban-container">
      {/* Sidebar Navigation */}
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
          <div className="sidebar-item active">
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

      {/* Main Content */}
      <div className="kanban-main">
      {/* Header */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '16px', 
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          👥 User Management
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          View and manage platform users
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card" style={{ borderLeftColor: '#667eea' }}>
          <h3>👥 {stats.total}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#007bff' }}>
          <h3>🎓 {stats.requesters}</h3>
          <p>Students</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#dc3545' }}>
          <h3>⚡ {stats.admins}</h3>
          <p>Admins</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>🔍 Filter by Role</h3>
        
        {/* Dropdown for Mobile */}
        <select 
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="requester">🎓 Students</option>
          <option value="admin">⚡ Admins</option>
        </select>
        
        {/* Buttons for Desktop */}
        <div className="filter-group">
          <button 
            onClick={() => setFilter('all')} 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Users
          </button>
          <button 
            onClick={() => setFilter('requester')} 
            className={`btn ${filter === 'requester' ? 'btn-primary' : 'btn-secondary'}`}
          >
            🎓 Students
          </button>
          <button 
            onClick={() => setFilter('admin')} 
            className={`btn ${filter === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
          >
            ⚡ Admins
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#667eea' }}>
          📋 Users List ({filteredUsers.length})
        </h2>
        
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👤</div>
            <h3>No users found</h3>
            <p>No users match the selected filter</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Branch</th>
                  <th>College</th>
                  <th style={{ textAlign: 'center' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#333' }}>{user.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#999' }}>
                            ID: {user._id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#666' }}>{user.email}</td>
                    <td style={{ color: '#666' }}>{user.phone || 'N/A'}</td>
                    <td style={{ color: '#666' }}>{user.branch || 'N/A'}</td>
                    <td style={{ color: '#666' }}>{user.college || 'N/A'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        padding: '0.5rem 1.2rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        background: user.role === 'admin' 
                          ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                          : user.role === 'builder'
                            ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                            : 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'inline-block'
                      }}>
                        {user.role === 'requester' ? '🎓 Student' : user.role === 'builder' ? '👨‍💻 Developer' : '⚡ Admin'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default AdminPanel;

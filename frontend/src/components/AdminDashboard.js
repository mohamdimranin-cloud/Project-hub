import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../api';

function AdminDashboard({ onLogout }) {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    pending: true,
    inProgress: true,
    completed: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projects.getAll();
      setProjectList(response.data);
    } catch (error) {
      console.error('Failed to load projects', error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectsByStatus = (status) => {
    return projectList.filter(p => {
      if (status === 'pending') {
        return ['open', 'in-review'].includes(p.status);
      } else if (status === 'in-progress') {
        return ['accepted', 'in-progress', 'delivered'].includes(p.status);
      } else if (status === 'completed') {
        // Only show projects that are explicitly marked as 'completed'
        return p.status === 'completed';
      }
      return false;
    });
  };

  const pendingProjects = getProjectsByStatus('pending');
  const inProgressProjects = getProjectsByStatus('in-progress');
  const completedProjects = getProjectsByStatus('completed');
  
  // Analytics calculations
  const totalRevenue = projectList
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + (p.budget || 0), 0);
  
  const categoryStats = {};
  projectList.forEach(p => {
    if (p.category) {
      categoryStats[p.category] = (categoryStats[p.category] || 0) + 1;
    }
  });
  
  const typeStats = {
    mini: projectList.filter(p => p.projectType === 'mini').length,
    major: projectList.filter(p => p.projectType === 'major').length
  };
  
  // Monthly data (last 6 months)
  const monthlyData = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
    monthlyData[monthKey] = 0;
  }
  
  projectList.forEach(p => {
    const projectDate = new Date(p.createdAt);
    const monthKey = projectDate.toLocaleDateString('en-US', { month: 'short' });
    if (monthlyData.hasOwnProperty(monthKey)) {
      monthlyData[monthKey]++;
    }
  });

  const getPriorityColor = (projectType) => {
    return projectType === 'major' ? '#FF6A00' : '#2D7FF9';
  };

  const getPriorityLabel = (projectType) => {
    return projectType === 'major' ? 'High' : 'Normal';
  };

  const getProgressPercentage = (project) => {
    if (project.status === 'completed') return 100;
    if (project.status === 'delivered') return 90;
    if (project.status === 'in-progress') return 60;
    if (project.status === 'accepted') return 40;
    if (project.status === 'in-review') return 20;
    return 10;
  };

  if (loading) {
    return (
      <div className="kanban-container">
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
          <div className="sidebar-item active">
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
        {/* Top Header */}
        <div className="kanban-header">
        <div>
          <h1 className="kanban-title">Task Board</h1>
        </div>
      </div>

      {/* Analytics Stats */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card" style={{ borderLeftColor: '#FF6A00' }}>
          <h3>📁 {projectList.length}</h3>
          <p>Total Projects</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#FFC107' }}>
          <h3>⏳ {pendingProjects.length}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#2D7FF9' }}>
          <h3>⚙️ {inProgressProjects.length}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#43C654' }}>
          <h3>✅ {completedProjects.length}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#43C654' }}>
          <h3>💰 ₹{totalRevenue.toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="overall-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${projectList.length > 0 ? (completedProjects.length / projectList.length * 100) : 0}%` 
            }}
          ></div>
        </div>
        <span className="progress-percentage">
          {projectList.length > 0 ? Math.round((completedProjects.length / projectList.length) * 100) : 0}%
        </span>
      </div>

      {/* Analytics Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Monthly Chart */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#FF6A00' }}>📈 Projects Per Month</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '150px', borderBottom: '2px solid #E8EDF2', paddingBottom: '10px' }}>
            {Object.entries(monthlyData).map(([month, count]) => {
              const maxCount = Math.max(...Object.values(monthlyData), 1);
              const heightPercent = (count / maxCount) * 100;
              return (
                <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ 
                    width: '100%', 
                    height: `${heightPercent}%`,
                    minHeight: count > 0 ? '20px' : '0',
                    background: 'linear-gradient(180deg, #2D7FF9 0%, #1E5FCC 100%)',
                    borderRadius: '4px 4px 0 0',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 'bold',
                      color: '#2D7FF9',
                      fontSize: '0.9rem'
                    }}>
                      {count}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#666' }}>
                    {month}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Chart */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#FF6A00' }}>📊 Projects by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(categoryStats).slice(0, 5).map(([category, count]) => {
              const maxCount = Math.max(...Object.values(categoryStats));
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#1A1A1A', fontSize: '0.85rem' }}>{category}</span>
                    <span style={{ fontWeight: '700', color: '#FF6A00', fontSize: '0.85rem' }}>{count}</span>
                  </div>
                  <div style={{ height: '8px', background: '#E8EDF2', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: 'linear-gradient(90deg, #FF6A00 0%, #FF8533 100%)',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Types */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '20px', background: '#E7F1FF', borderRadius: '12px', textAlign: 'center', border: '2px solid #2D7FF9' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2D7FF9', marginBottom: '8px' }}>
            {typeStats.mini}
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1A1A1A' }}>🚀 Mini Projects</div>
        </div>
        <div style={{ padding: '20px', background: '#E8F5E9', borderRadius: '12px', textAlign: 'center', border: '2px solid #43C654' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#43C654', marginBottom: '8px' }}>
            {typeStats.major}
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1A1A1A' }}>🎓 Major Projects</div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

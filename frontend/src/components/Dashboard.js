import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../api';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, completed: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      const response = await projects.getAll();
      const data = response.data;
      
      // Calculate last activity date
      let lastActivity = null;
      if (data.length > 0) {
        const sortedByDate = [...data].sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt);
          const dateB = new Date(b.updatedAt || b.createdAt);
          return dateB - dateA;
        });
        lastActivity = sortedByDate[0].updatedAt || sortedByDate[0].createdAt;
      }
      
      setStats({
        total: data.length,
        open: data.filter(p => ['open', 'in-review'].includes(p.status)).length,
        inProgress: data.filter(p => ['accepted', 'in-progress', 'delivered'].includes(p.status)).length,
        completed: data.filter(p => p.status === 'completed').length,
        rejected: data.filter(p => p.status === 'rejected').length,
        lastActivity
      });
    } catch (error) {
      console.error('Failed to load stats', error);
    } finally {
      setLoading(false);
    }
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
    <div className="container">
      {/* Welcome Header */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '16px', 
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            👋 Welcome back, {user.name}!
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Here's an overview of your projects
          </p>
        </div>
        <button 
          onClick={() => navigate('/student/create-project')}
          className="btn btn-primary"
          style={{ padding: '1rem 2rem', fontSize: '1rem' }}
        >
          ➕ Post New Project
        </button>
      </div>

      {/* Mini Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Total Projects */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.total}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Total Projects</div>
          </div>
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            fontSize: '8rem',
            opacity: 0.1
          }}>📊</div>
        </div>

        {/* Ongoing vs Completed */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          border: '2px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem', color: '#333' }}>
            📈 Project Status
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#FF6A00',
                marginBottom: '0.5rem'
              }}>
                {stats.inProgress}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Ongoing</div>
              <div style={{
                marginTop: '0.5rem',
                height: '4px',
                background: '#FF6A00',
                borderRadius: '2px'
              }}></div>
            </div>
            <div style={{ width: '2px', background: '#e0e0e0' }}></div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#43C654',
                marginBottom: '0.5rem'
              }}>
                {stats.completed}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Completed</div>
              <div style={{
                marginTop: '0.5rem',
                height: '4px',
                background: '#43C654',
                borderRadius: '2px'
              }}></div>
            </div>
          </div>
          {stats.total > 0 && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                Completion Rate
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1, height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(stats.completed / stats.total) * 100}%`,
                    background: 'linear-gradient(90deg, #43C654 0%, #36A346 100%)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#43C654' }}>
                  {Math.round((stats.completed / stats.total) * 100)}%
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Last Activity */}
        <div style={{
          background: 'linear-gradient(135deg, #2D7FF9 0%, #1E5FCC 100%)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(45, 127, 249, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🕐</div>
            <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '0.5rem' }}>Last Activity</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {stats.lastActivity 
                ? new Date(stats.lastActivity).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })
                : 'No activity yet'}
            </div>
            {stats.lastActivity && (
              <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.5rem' }}>
                {(() => {
                  const days = Math.floor((new Date() - new Date(stats.lastActivity)) / (1000 * 60 * 60 * 24));
                  if (days === 0) return 'Today';
                  if (days === 1) return 'Yesterday';
                  return `${days} days ago`;
                })()}
              </div>
            )}
          </div>
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            fontSize: '8rem',
            opacity: 0.1
          }}>🕐</div>
        </div>
      </div>

      {/* Additional Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card" style={{ borderLeftColor: '#17a2b8' }}>
          <h3>🔓 {stats.open}</h3>
          <p>Open & Pending</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#FF6A00' }}>
          <h3>⚙️ {stats.inProgress}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#43C654' }}>
          <h3>✅ {stats.completed}</h3>
          <p>Completed</p>
        </div>
        {stats.rejected > 0 && (
          <div className="stat-card" style={{ borderLeftColor: '#dc3545' }}>
            <h3>❌ {stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        )}
      </div>

      {/* Empty State */}
      {stats.total === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>No Projects Yet</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              Get started by posting your first project!
            </p>
            <button 
              onClick={() => navigate('/student/create-project')}
              className="btn btn-primary"
              style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
            >
              🚀 Post Your First Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

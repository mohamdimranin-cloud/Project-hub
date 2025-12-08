import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../api';

function AdminProjectManagement({ onLogout }) {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [filters, setFilters] = useState({ status: '', category: '', projectType: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [progressModal, setProgressModal] = useState(null);
  const [progressData, setProgressData] = useState({ percentage: 0, message: '' });

  useEffect(() => {
    loadProjects();
  }, [filters]);

  const loadProjects = async () => {
    try {
      const response = await projects.getAll(filters);
      // Sort projects by creation date - latest first
      const sortedProjects = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setProjectList(sortedProjects);
    } catch (error) {
      console.error('Failed to load projects', error);
    }
  };

  const handleUpdateProgress = async () => {
    if (!progressData.message.trim()) {
      alert('Please enter a progress message');
      return;
    }
    try {
      await projects.addProgress(progressModal._id, progressData.message);
      alert('Progress updated successfully');
      setProgressModal(null);
      setProgressData({ percentage: 0, message: '' });
      loadProjects();
    } catch (error) {
      alert('Failed to update progress');
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await projects.updateStatus(projectId, newStatus);
      alert('✅ Status updated successfully');
      loadProjects();
    } catch (error) {
      console.error('Status update error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
      alert(`❌ Failed to update status: ${errorMessage}`);
    }
  };

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
          <div className="sidebar-item active">
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
        <h1 style={{ marginBottom: '1.5rem' }}>Project Management</h1>

      {/* Filters */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label>Status</label>
            <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="in-review">In Review</option>
              <option value="accepted">Accepted</option>
              <option value="in-progress">In Progress</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
              <option value="">All</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="ML">ML</option>
              <option value="AI">AI</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select value={filters.projectType} onChange={(e) => setFilters({...filters, projectType: e.target.value})}>
              <option value="">All</option>
              <option value="mini">Mini</option>
              <option value="major">Major</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      {projectList.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          No projects found
        </div>
      ) : (
        projectList.map(project => (
          <div key={project._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{project.title}</h3>
              <span className={`status-badge status-${project.status}`}>{project.status}</span>
            </div>

            {/* Project Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Project Type</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{project.projectType === 'mini' ? 'Mini Project' : 'Major Project'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Category</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{project.category}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Budget</div>
                <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#28a745' }}>₹{project.budget?.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Deadline</div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{new Date(project.deadline).toLocaleDateString()}</div>
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Technologies</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} style={{ padding: '0.25rem 0.75rem', background: '#e7f5ff', color: '#007bff', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Student Contact Details */}
            <div style={{ padding: '1rem', background: '#e7f5ff', borderRadius: '6px', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#007bff', marginBottom: '0.75rem' }}>Student Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>Name: </span>
                  <span style={{ fontWeight: '600' }}>{project.requester?.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>Phone: </span>
                  <span style={{ fontWeight: '600' }}>{project.phone || project.requester?.phone || 'N/A'}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>Email: </span>
                  <span style={{ fontWeight: '500' }}>{project.requester?.email}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>Branch: </span>
                  <span style={{ fontWeight: '500' }}>{project.requester?.branch || 'N/A'}</span>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>College: </span>
                  <span style={{ fontWeight: '500' }}>{project.requester?.college || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Submission Date */}
            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
              Submitted on: {new Date(project.createdAt).toLocaleString()}
            </div>

            {/* Progress Updates */}
            {project.progressUpdates && project.progressUpdates.length > 0 && (
              <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f0f8ff', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#007bff', marginBottom: '0.5rem' }}>Progress History</div>
                {project.progressUpdates.slice(-3).map((update, i) => (
                  <div key={i} style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'white', borderRadius: '4px', marginBottom: '0.25rem' }}>
                    <div style={{ color: '#666' }}>{new Date(update.date).toLocaleString()}</div>
                    <div>{update.message}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {selectedProject?._id === project._id ? (
                <>
                  <div style={{ width: '100%', padding: '1rem', background: '#fff9e6', borderRadius: '6px', border: '1px solid #ffd700', marginBottom: '0.5rem' }}>
                    <h4 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#856404' }}>Full Description</h4>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', margin: 0 }}>{project.description}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="btn btn-secondary"
                  >
                    Close Details
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setSelectedProject(project)} 
                  className="btn btn-primary"
                >
                  View Full Details
                </button>
              )}
              
              <button 
                onClick={() => setProgressModal(project)} 
                className="btn btn-primary"
                style={{ background: '#28a745', borderColor: '#28a745' }}
              >
                Update Progress
              </button>

              {project.status === 'open' && (
                <button 
                  onClick={() => handleStatusChange(project._id, 'in-progress')} 
                  className="btn btn-primary"
                  style={{ background: '#17a2b8', borderColor: '#17a2b8' }}
                >
                  Start Project
                </button>
              )}

              {project.status === 'in-progress' && (
                <button 
                  onClick={() => handleStatusChange(project._id, 'completed')} 
                  className="btn btn-primary"
                  style={{ background: '#28a745', borderColor: '#28a745' }}
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {/* Progress Update Modal */}
      {progressModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ maxWidth: '500px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
            <h2>Update Project Progress</h2>
            <p><strong>Project:</strong> {progressModal.title}</p>
            
            <div className="form-group">
              <label>Progress Message *</label>
              <textarea
                rows="4"
                value={progressData.message}
                onChange={(e) => setProgressData({...progressData, message: e.target.value})}
                placeholder="Describe the current progress, what has been completed, and next steps..."
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleUpdateProgress} className="btn btn-primary" style={{ flex: 1 }}>
                Update Progress
              </button>
              <button onClick={() => {
                setProgressModal(null);
                setProgressData({ percentage: 0, message: '' });
              }} className="btn btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default AdminProjectManagement;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../api';

function ProjectList({ user }) {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadProjects();
  }, [filter]);

  const loadProjects = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await projects.getAll(params);
      // Sort by creation date - latest first
      const sortedProjects = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setProjectList(sortedProjects);
    } catch (error) {
      console.error('Failed to load projects', error);
    }
  };

  const baseUrl = user?.role === 'admin' ? '/admin' : '/student';

  return (
    <div className="container">
      {/* Header */}
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
            📁 My Projects
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            {projectList.length} project{projectList.length !== 1 ? 's' : ''} found
          </p>
        </div>
        {user?.role === 'requester' && (
          <button 
            onClick={() => navigate('/student/create-project')} 
            className="btn btn-primary"
            style={{ padding: '1rem 2rem', fontSize: '1rem' }}
          >
            ➕ Post New Project
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>🔍 Filter by Status</h3>
        
        {/* Dropdown for Mobile */}
        <select 
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="open">🔓 Open</option>
          <option value="in-review">👀 In Review</option>
          <option value="accepted">✅ Accepted</option>
          <option value="in-progress">⚙️ In Progress</option>
          <option value="delivered">📦 Delivered</option>
          <option value="completed">🎉 Completed</option>
        </select>
        
        {/* Buttons for Desktop */}
        <div className="filter-group">
          <button 
            onClick={() => setFilter('all')} 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('open')} 
            className={`btn ${filter === 'open' ? 'btn-primary' : 'btn-secondary'}`}
          >
            🔓 Open
          </button>
          <button 
            onClick={() => setFilter('in-review')} 
            className={`btn ${filter === 'in-review' ? 'btn-primary' : 'btn-secondary'}`}
          >
            👀 In Review
          </button>
          <button 
            onClick={() => setFilter('accepted')} 
            className={`btn ${filter === 'accepted' ? 'btn-primary' : 'btn-secondary'}`}
          >
            ✅ Accepted
          </button>
          <button 
            onClick={() => setFilter('in-progress')} 
            className={`btn ${filter === 'in-progress' ? 'btn-primary' : 'btn-secondary'}`}
          >
            ⚙️ In Progress
          </button>
          <button 
            onClick={() => setFilter('delivered')} 
            className={`btn ${filter === 'delivered' ? 'btn-primary' : 'btn-secondary'}`}
          >
            📦 Delivered
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            🎉 Completed
          </button>
        </div>
      </div>

      {/* Projects List */}
      {projectList.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📂</div>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>No Projects Found</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              {filter === 'all' 
                ? "You haven't posted any projects yet. Get started now!"
                : `No projects with status "${filter}"`
              }
            </p>
            {user?.role === 'requester' && filter === 'all' && (
              <button 
                onClick={() => navigate('/student/create-project')}
                className="btn btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
              >
                🚀 Post Your First Project
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {projectList.map(project => (
            <div 
              key={project._id} 
              className="project-card"
              onClick={() => navigate(`${baseUrl}/projects/${project._id}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>{project.title}</h3>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: project.projectType === 'mini' ? '#e7f5ff' : '#d4edda',
                      color: project.projectType === 'mini' ? '#007bff' : '#28a745',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {project.projectType === 'mini' ? '🚀 Mini' : '🎓 Major'}
                    </span>
                  </div>
                  
                  <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {project.description.substring(0, 150)}
                    {project.description.length > 150 && '...'}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#666' }}>
                    <span>📁 {project.category}</span>
                    <span>💰 ₹{project.budget?.toLocaleString()}</span>
                    <span>📅 {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-tag">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  {project.assignedDeveloper && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '0.75rem', 
                      background: '#f8f9fa', 
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}>
                        {project.assignedDeveloper.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>Assigned Developer</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{project.assignedDeveloper.name}</div>
                      </div>
                    </div>
                  )}
                  
                  {project.progressUpdates && project.progressUpdates.length > 0 && (
                    <div className="info-box info-box-primary" style={{ marginTop: '1rem', padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <strong>📝 Latest Update</strong>
                        <span style={{ 
                          padding: '0.15rem 0.5rem', 
                          background: '#007bff', 
                          color: 'white',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}>
                          {project.progressUpdates.length}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        {project.progressUpdates[project.progressUpdates.length - 1].message.substring(0, 100)}
                        {project.progressUpdates[project.progressUpdates.length - 1].message.length > 100 && '...'}
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span className={`status-badge status-${project.status}`}>
                    {project.status.toUpperCase()}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#999', textAlign: 'right' }}>
                    Posted {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;

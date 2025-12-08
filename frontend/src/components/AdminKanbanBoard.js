import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../api';

function AdminKanbanBoard() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (status === 'pending') {
        return ['open', 'in-review'].includes(p.status) && matchesSearch;
      } else if (status === 'in-progress') {
        return ['accepted', 'in-progress'].includes(p.status) && matchesSearch;
      } else if (status === 'on-hold') {
        return ['delivered', 'rejected'].includes(p.status) && matchesSearch;
      }
      return false;
    });
  };

  const pendingProjects = getProjectsByStatus('pending');
  const inProgressProjects = getProjectsByStatus('in-progress');
  const onHoldProjects = getProjectsByStatus('on-hold');

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
          <div className="sidebar-item" onClick={() => navigate('/admin/dashboard')}>
            <span className="sidebar-item-icon">📊</span>
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item active">
            <span className="sidebar-item-icon">📋</span>
            <span>Task board</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/admin/projects')}>
            <span className="sidebar-item-icon">📁</span>
            <span>Project</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/admin/users')}>
            <span className="sidebar-item-icon">👥</span>
            <span>Users</span>
          </div>
        </div>
        
        <div className="sidebar-menu" style={{ marginTop: '32px' }}>
          <div className="sidebar-section-title">ACCOUNT</div>
          <div className="sidebar-item" onClick={() => navigate('/admin/profile')}>
            <span className="sidebar-item-icon">👤</span>
            <span>Profile</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/admin/notifications')}>
            <span className="sidebar-item-icon">🔔</span>
            <span>Notification</span>
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

      {/* Progress Bar */}
      <div className="overall-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${projectList.length > 0 ? (projectList.filter(p => p.status === 'completed').length / projectList.length * 100) : 0}%` 
            }}
          ></div>
        </div>
        <span className="progress-percentage">
          {projectList.length > 0 ? Math.round(projectList.filter(p => p.status === 'completed').length / projectList.length * 100) : 0}%
        </span>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {/* Pending Column */}
        <div className="kanban-column">
          <div className="column-header pending-header">
            <div className="column-title">
              <span>Pending</span>
              <span className="column-count">{pendingProjects.length}</span>
            </div>
            <div className="column-actions">
              <button className="icon-btn">+</button>
              <button className="icon-btn">⋮</button>
            </div>
          </div>
          <div className="column-content">
            {pendingProjects.map(project => (
              <div 
                key={project._id} 
                className="task-card"
                onClick={() => navigate(`/admin/projects/${project._id}`)}
              >
                <div className="task-header">
                  <h3 className="task-title">{project.title}</h3>
                  <button className="task-menu">⋮</button>
                </div>
                <div className="task-priority" style={{ color: getPriorityColor(project.projectType) }}>
                  {getPriorityLabel(project.projectType)}
                </div>
                <div className="task-progress">
                  <div className="progress-bar-small">
                    <div 
                      className="progress-fill-small" 
                      style={{ 
                        width: `${getProgressPercentage(project)}%`,
                        background: getPriorityColor(project.projectType)
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">{getProgressPercentage(project)}%</span>
                </div>
                <div className="task-footer">
                  <div className="task-avatars">
                    <div className="avatar-small">{project.requester?.name?.charAt(0) || 'U'}</div>
                    {project.assignedDeveloper && (
                      <div className="avatar-small">{project.assignedDeveloper.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="task-meta">
                    <span className="meta-item">📎 {project.uploads?.length || 0}</span>
                    <span className="meta-item">💬 {project.progressUpdates?.length || 0}</span>
                  </div>
                </div>
                <div className="task-date">
                  🕐 {new Date(project.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="kanban-column">
          <div className="column-header inprogress-header">
            <div className="column-title">
              <span>In Progress</span>
              <span className="column-count">{inProgressProjects.length}</span>
            </div>
            <div className="column-actions">
              <button className="icon-btn">+</button>
              <button className="icon-btn">⋮</button>
            </div>
          </div>
          <div className="column-content">
            {inProgressProjects.map(project => (
              <div 
                key={project._id} 
                className="task-card"
                onClick={() => navigate(`/admin/projects/${project._id}`)}
              >
                <div className="task-header">
                  <h3 className="task-title">{project.title}</h3>
                  <button className="task-menu">⋮</button>
                </div>
                <div className="task-priority" style={{ color: getPriorityColor(project.projectType) }}>
                  {getPriorityLabel(project.projectType)}
                </div>
                <div className="task-progress">
                  <div className="progress-bar-small">
                    <div 
                      className="progress-fill-small" 
                      style={{ 
                        width: `${getProgressPercentage(project)}%`,
                        background: getPriorityColor(project.projectType)
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">{getProgressPercentage(project)}%</span>
                </div>
                <div className="task-footer">
                  <div className="task-avatars">
                    <div className="avatar-small">{project.requester?.name?.charAt(0) || 'U'}</div>
                    {project.assignedDeveloper && (
                      <div className="avatar-small">{project.assignedDeveloper.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="task-meta">
                    <span className="meta-item">📎 {project.uploads?.length || 0}</span>
                    <span className="meta-item">💬 {project.progressUpdates?.length || 0}</span>
                  </div>
                </div>
                <div className="task-date">
                  🕐 {new Date(project.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* On Hold Column */}
        <div className="kanban-column">
          <div className="column-header onhold-header">
            <div className="column-title">
              <span>On Hold</span>
              <span className="column-count">{onHoldProjects.length}</span>
            </div>
            <div className="column-actions">
              <button className="icon-btn">+</button>
              <button className="icon-btn">⋮</button>
            </div>
          </div>
          <div className="column-content">
            {onHoldProjects.map(project => (
              <div 
                key={project._id} 
                className="task-card"
                onClick={() => navigate(`/admin/projects/${project._id}`)}
              >
                <div className="task-header">
                  <h3 className="task-title">{project.title}</h3>
                  <button className="task-menu">⋮</button>
                </div>
                <div className="task-priority" style={{ color: getPriorityColor(project.projectType) }}>
                  {getPriorityLabel(project.projectType)}
                </div>
                <div className="task-progress">
                  <div className="progress-bar-small">
                    <div 
                      className="progress-fill-small" 
                      style={{ 
                        width: `${getProgressPercentage(project)}%`,
                        background: getPriorityColor(project.projectType)
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">{getProgressPercentage(project)}%</span>
                </div>
                <div className="task-footer">
                  <div className="task-avatars">
                    <div className="avatar-small">{project.requester?.name?.charAt(0) || 'U'}</div>
                    {project.assignedDeveloper && (
                      <div className="avatar-small">{project.assignedDeveloper.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="task-meta">
                    <span className="meta-item">📎 {project.uploads?.length || 0}</span>
                    <span className="meta-item">💬 {project.progressUpdates?.length || 0}</span>
                  </div>
                </div>
                <div className="task-date">
                  🕐 {new Date(project.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default AdminKanbanBoard;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../api';

function ProjectDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await projects.getById(id);
      setProject(response.data);
    } catch (error) {
      console.error('Failed to load project', error);
    }
  };

  if (!project) return <div className="container">Loading...</div>;

  const backUrl = user?.role === 'admin' ? '/admin/projects' : '/student/projects';

  return (
    <div className="container">
      <button onClick={() => navigate(backUrl)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Back to Projects
      </button>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem' }}>{project.title}</h1>
            <span className={`status-badge status-${project.status}`}>{project.status.toUpperCase()}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Project Type</div>
            <div style={{ fontWeight: '600' }}>{project.projectType === 'mini' ? 'Mini Project' : 'Major Project'}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Category</div>
            <div style={{ fontWeight: '600' }}>{project.category}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Budget</div>
            <div style={{ fontWeight: '600', color: '#28a745', fontSize: '1.1rem' }}>₹{project.budget?.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Deadline</div>
            <div style={{ fontWeight: '600' }}>{new Date(project.deadline).toLocaleDateString()}</div>
          </div>
        </div>

        {project.technologies?.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Preferred Technologies</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.technologies.map((tech, i) => (
                <span key={i} style={{ padding: '0.25rem 0.75rem', background: '#e7f5ff', color: '#007bff', borderRadius: '12px', fontSize: '0.9rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Full Description</div>
          <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#333' }}>{project.description}</p>
        </div>

        <div style={{ padding: '1.25rem', background: '#e7f5ff', borderRadius: '8px', borderLeft: '4px solid #007bff' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#007bff', marginBottom: '0.75rem' }}>Student Contact Details</div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div>
              <span style={{ fontWeight: '600' }}>Name:</span> {project.requester?.name}
            </div>
            <div>
              <span style={{ fontWeight: '600' }}>Email:</span> {project.requester?.email}
            </div>
            {(project.phone || project.requester?.phone) && (
              <div>
                <span style={{ fontWeight: '600' }}>Phone:</span> {project.phone || project.requester.phone}
              </div>
            )}
            {project.requester?.branch && (
              <div>
                <span style={{ fontWeight: '600' }}>Branch:</span> {project.requester.branch}
              </div>
            )}
            {project.requester?.college && (
              <div>
                <span style={{ fontWeight: '600' }}>College:</span> {project.requester.college}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
          Submitted on: {new Date(project.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Progress Updates - Visible to Students */}
      {user?.role === 'requester' && project.progressUpdates && project.progressUpdates.length > 0 && (
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#007bff' }}>Project Progress</h2>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {project.progressUpdates.map((update, i) => (
              <div key={i} style={{ 
                position: 'relative', 
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderLeft: i < project.progressUpdates.length - 1 ? '2px solid #e0e0e0' : 'none'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-2.5rem',
                  top: 0,
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  background: '#007bff',
                  border: '3px solid white',
                  boxShadow: '0 0 0 2px #007bff'
                }}></div>
                <div style={{ 
                  padding: '1rem', 
                  background: '#f8f9fa', 
                  borderRadius: '8px',
                  marginLeft: '0.5rem'
                }}>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: '#666', 
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    {new Date(update.date).toLocaleString()}
                  </div>
                  <div style={{ 
                    fontSize: '0.95rem', 
                    lineHeight: '1.6',
                    color: '#333'
                  }}>
                    {update.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProjectDetail;

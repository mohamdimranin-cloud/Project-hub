import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../api';

function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectType: 'mini',
    category: '',
    technologies: '',
    deadline: '',
    budget: '',
    uploads: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['IOT', 'Web App', 'Mobile App', 'ML', 'AI', 'Embedded', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        budget: formData.budget ? parseFloat(formData.budget) : null
      };
      
      await projects.create(projectData);
      alert('🎉 Project posted successfully! Admin will review it soon.');
      navigate('/student/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert(`❌ Failed to create project: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          📝 Post New Project
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Fill in the details below to get started with your project
        </p>
      </div>

      <div className="card" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
        <form onSubmit={handleSubmit}>
          {/* Project Type Selection */}
          <div className="form-group">
            <label>🎯 Project Type *</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              <div 
                onClick={() => setFormData({...formData, projectType: 'mini'})}
                style={{
                  padding: '1.5rem',
                  border: `3px solid ${formData.projectType === 'mini' ? '#667eea' : '#e0e0e0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  background: formData.projectType === 'mini' ? 'linear-gradient(135deg, #e7f5ff 0%, #d4edff 100%)' : 'white'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
                <div style={{ fontWeight: '600', color: formData.projectType === 'mini' ? '#667eea' : '#333' }}>
                  Mini Project
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                  Quick turnaround
                </div>
              </div>
              <div 
                onClick={() => setFormData({...formData, projectType: 'major'})}
                style={{
                  padding: '1.5rem',
                  border: `3px solid ${formData.projectType === 'major' ? '#667eea' : '#e0e0e0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  background: formData.projectType === 'major' ? 'linear-gradient(135deg, #e7f5ff 0%, #d4edff 100%)' : 'white'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</div>
                <div style={{ fontWeight: '600', color: formData.projectType === 'major' ? '#667eea' : '#333' }}>
                  Major Project
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                  Complex & detailed
                </div>
              </div>
            </div>
          </div>

          {/* Project Title */}
          <div className="form-group">
            <label>📌 Project Title *</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Smart Home Automation System"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>🏷️ Category *</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>📄 Full Description *</label>
            <textarea 
              rows="8"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your project requirements in detail...&#10;&#10;Include:&#10;• What you want to build&#10;• Key features needed&#10;• Any specific requirements&#10;• Expected deliverables"
              required
              style={{ lineHeight: '1.6' }}
            />
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              {formData.description.length} characters
            </div>
          </div>

          {/* Technologies */}
          <div className="form-group">
            <label>💻 Preferred Technologies (optional)</label>
            <input 
              type="text" 
              value={formData.technologies}
              onChange={(e) => setFormData({...formData, technologies: e.target.value})}
              placeholder="e.g., React, Node.js, MongoDB, Python, TensorFlow"
            />
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              Separate multiple technologies with commas
            </div>
          </div>

          {/* Budget and Deadline Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>💰 Budget (₹) *</label>
              <input 
                type="number" 
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                placeholder="Enter amount"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>📅 Deadline *</label>
              <input 
                type="date" 
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="info-box info-box-primary" style={{ marginTop: '1.5rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>ℹ️ What happens next?</div>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              1. Your project will be reviewed by our admin team<br/>
              2. Once approved, developers can view and bid on your project<br/>
              3. You'll receive notifications about project updates<br/>
              4. Track progress through your dashboard
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              marginTop: '2rem',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: '700'
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? '⏳ Posting Project...' : '🚀 Post Project Request'}
          </button>

          <button 
            type="button"
            onClick={() => navigate('/student/projects')}
            className="btn btn-secondary" 
            style={{ 
              width: '100%', 
              marginTop: '1rem'
            }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;

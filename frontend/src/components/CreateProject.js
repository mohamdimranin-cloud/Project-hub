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
    uploads: [],
    // Prototype specific fields
    problemStatement: '',
    targetPlatform: '',
    prototypeType: '',
    preferredTools: '',
    numberOfScreens: '',
    referenceDesigns: '',
    // Documentation specific fields
    documentType: '',
    collegeFormat: '',
    numberOfPages: '',
    plagiarismLimit: '',
    referenceFile: '',
    specialInstructions: ''
  });

  const projectTypes = [
    { 
      value: 'mini', 
      label: 'Mini Project', 
      icon: '🚀', 
      description: 'Quick implementation',
      color: '#5DADE2'
    },
    { 
      value: 'major', 
      label: 'Major Project', 
      icon: '🎓', 
      description: 'Complex & detailed',
      color: '#48C9B0'
    },
    { 
      value: 'prototype', 
      label: 'Prototype', 
      icon: '⚡', 
      description: 'MVP & proof of concept',
      color: '#F39C12'
    },
    { 
      value: 'design', 
      label: 'Design & Documentation', 
      icon: '📐', 
      description: 'UI/UX & technical docs',
      color: '#AF7AC5'
    }
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Web App', 'Mobile App', 'ML', 'AI', 'Other'];

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
            <label style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2C3E50', marginBottom: '1rem', display: 'block' }}>
              🎯 Select Project Type *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
              {projectTypes.map((type) => (
                <div 
                  key={type.value}
                  onClick={() => setFormData({...formData, projectType: type.value})}
                  style={{
                    padding: '1.5rem 1rem',
                    border: `2px solid ${formData.projectType === type.value ? type.color : '#E8E8E8'}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    background: formData.projectType === type.value 
                      ? `linear-gradient(135deg, ${type.color}15 0%, ${type.color}08 100%)` 
                      : '#FAFAFA',
                    transform: formData.projectType === type.value ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: formData.projectType === type.value 
                      ? `0 8px 20px ${type.color}30` 
                      : '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{type.icon}</div>
                  <div style={{ 
                    fontWeight: '700', 
                    color: formData.projectType === type.value ? type.color : '#2C3E50',
                    fontSize: '1rem',
                    marginBottom: '0.25rem'
                  }}>
                    {type.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#7F8C8D', lineHeight: '1.4' }}>
                    {type.description}
                  </div>
                </div>
              ))}
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

          {/* Category - Only for Mini and Major projects */}
          {(formData.projectType === 'mini' || formData.projectType === 'major') && (
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
          )}

          {/* PROTOTYPE SPECIFIC FIELDS */}
          {formData.projectType === 'prototype' && (
            <>
              <div className="form-group">
                <label>💡 Problem Statement / Idea *</label>
                <textarea 
                  rows="4"
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({...formData, problemStatement: e.target.value})}
                  placeholder="Describe the problem you're solving or the idea you want to validate..."
                  required
                  style={{ lineHeight: '1.6' }}
                />
              </div>

              <div className="form-group">
                <label>📱 Target Platform *</label>
                <select 
                  value={formData.targetPlatform}
                  onChange={(e) => setFormData({...formData, targetPlatform: e.target.value})}
                  required
                >
                  <option value="">Select platform</option>
                  <option value="Web">Web</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Cross-Platform">Cross-Platform</option>
                </select>
              </div>

              <div className="form-group">
                <label>🎨 Prototype Type *</label>
                <select 
                  value={formData.prototypeType}
                  onChange={(e) => setFormData({...formData, prototypeType: e.target.value})}
                  required
                >
                  <option value="">Select type</option>
                  <option value="UI Only">UI Only (Clickable Demo)</option>
                  <option value="Functional Demo">Functional Demo (With Basic Logic)</option>
                  <option value="Wireframes">Wireframes & Mockups</option>
                  <option value="Full Interactive">Full Interactive Prototype</option>
                </select>
              </div>

              <div className="form-group">
                <label>🛠️ Preferred Tools *</label>
                <input 
                  type="text" 
                  value={formData.preferredTools}
                  onChange={(e) => setFormData({...formData, preferredTools: e.target.value})}
                  placeholder="e.g., Figma, React, Flutter, Adobe XD"
                  required
                />
              </div>

              <div className="form-group">
                <label>📊 Number of Screens / Pages *</label>
                <input 
                  type="number" 
                  value={formData.numberOfScreens}
                  onChange={(e) => setFormData({...formData, numberOfScreens: e.target.value})}
                  placeholder="e.g., 10"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>🖼️ Reference Designs (Optional)</label>
                <textarea 
                  rows="3"
                  value={formData.referenceDesigns}
                  onChange={(e) => setFormData({...formData, referenceDesigns: e.target.value})}
                  placeholder="Paste links to Figma, Dribbble, or describe design inspiration..."
                  style={{ lineHeight: '1.6' }}
                />
              </div>
            </>
          )}

          {/* DOCUMENTATION SPECIFIC FIELDS */}
          {formData.projectType === 'design' && (
            <>
              <div className="form-group">
                <label>📝 Document Type *</label>
                <select 
                  value={formData.documentType}
                  onChange={(e) => setFormData({...formData, documentType: e.target.value})}
                  required
                >
                  <option value="">Select document type</option>
                  <option value="Project Report">Project Report (Chapters 1-6)</option>
                  <option value="IEEE Documentation">IEEE Format Documentation</option>
                  <option value="PPT Presentation">PPT for Presentation</option>
                  <option value="Abstract & Synopsis">Abstract & Synopsis</option>
                  <option value="SRS">SRS (Software Requirement Specification)</option>
                  <option value="Test Cases">Test Cases</option>
                  <option value="User Manual">User Manual</option>
                  <option value="Research Paper">Research Paper Format</option>
                  <option value="Internship Report">Internship Report</option>
                  <option value="Complete Package">Complete Package (Report + PPT + Abstract)</option>
                </select>
              </div>

              <div className="form-group">
                <label>🎓 College / University Format *</label>
                <input 
                  type="text" 
                  value={formData.collegeFormat}
                  onChange={(e) => setFormData({...formData, collegeFormat: e.target.value})}
                  placeholder="e.g., Anna University, VTU, JNTU, IEEE"
                  required
                />
              </div>

              <div className="form-group">
                <label>💻 Technology Used (Optional)</label>
                <input 
                  type="text" 
                  value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                  placeholder="e.g., Python, Machine Learning, React"
                />
              </div>

              <div className="form-group">
                <label>📄 Number of Pages Required (Optional)</label>
                <input 
                  type="number" 
                  value={formData.numberOfPages}
                  onChange={(e) => setFormData({...formData, numberOfPages: e.target.value})}
                  placeholder="e.g., 50"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>🔍 Plagiarism Limit (%) *</label>
                <select 
                  value={formData.plagiarismLimit}
                  onChange={(e) => setFormData({...formData, plagiarismLimit: e.target.value})}
                  required
                >
                  <option value="">Select plagiarism limit</option>
                  <option value="0-5%">0-5% (Premium Quality)</option>
                  <option value="5-10%">5-10% (High Quality)</option>
                  <option value="10-15%">10-15% (Standard)</option>
                  <option value="15-20%">15-20% (Basic)</option>
                </select>
              </div>

              <div className="form-group">
                <label>📎 Reference File / Sample Format (Optional)</label>
                <textarea 
                  rows="2"
                  value={formData.referenceFile}
                  onChange={(e) => setFormData({...formData, referenceFile: e.target.value})}
                  placeholder="Paste Google Drive link or describe the format you need..."
                  style={{ lineHeight: '1.6' }}
                />
              </div>
            </>
          )}

          {/* Description - For Mini and Major projects */}
          {(formData.projectType === 'mini' || formData.projectType === 'major') && (
            <>
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
            </>
          )}

          {/* Special Instructions - For Prototype and Documentation */}
          {(formData.projectType === 'prototype' || formData.projectType === 'design') && (
            <div className="form-group">
              <label>📋 Special Instructions *</label>
              <textarea 
                rows="5"
                value={formData.specialInstructions}
                onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                placeholder="Any additional requirements, preferences, or important details we should know..."
                required
                style={{ lineHeight: '1.6' }}
              />
            </div>
          )}

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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { settings } from '../api';

function Settings({ onLogout }) {
  const navigate = useNavigate();
  const [settingsData, setSettingsData] = useState(null);
  const [activeTab, setActiveTab] = useState('faqs');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await settings.get();
      setSettingsData(response.data);
    } catch (error) {
      console.error('Failed to load settings', error);
    }
  };

  const handleUpdateFAQs = async () => {
    try {
      await settings.updateFAQs(settingsData.faqs);
      alert('FAQs updated successfully');
    } catch (error) {
      alert('Failed to update FAQs');
    }
  };

  const handleUpdateContact = async () => {
    try {
      await settings.updateContact(settingsData.contactDetails);
      alert('Contact details updated successfully');
    } catch (error) {
      alert('Failed to update contact details');
    }
  };

  const handleUpdatePricing = async () => {
    try {
      await settings.updatePricing(settingsData.pricingRules);
      alert('Pricing updated successfully');
    } catch (error) {
      alert('Failed to update pricing');
    }
  };

  const handleUpdateHomepage = async () => {
    try {
      await settings.updateHomepage(settingsData.homepageContent);
      alert('Homepage content updated successfully');
    } catch (error) {
      alert('Failed to update homepage');
    }
  };

  const addFAQ = () => {
    setSettingsData({
      ...settingsData,
      faqs: [...settingsData.faqs, { question: '', answer: '' }]
    });
  };

  const removeFAQ = (index) => {
    const newFaqs = settingsData.faqs.filter((_, i) => i !== index);
    setSettingsData({ ...settingsData, faqs: newFaqs });
  };

  const updateFAQ = (index, field, value) => {
    const newFaqs = [...settingsData.faqs];
    newFaqs[index][field] = value;
    setSettingsData({ ...settingsData, faqs: newFaqs });
  };

  if (!settingsData) return <div className="container">Loading...</div>;

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
          <div className="sidebar-item" onClick={(e) => { e.preventDefault(); navigate('/admin/users'); }}>
            <span className="sidebar-item-icon">👥</span>
            <span>Users</span>
          </div>
          <div className="sidebar-item active">
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
        <h1 style={{ marginBottom: '1.5rem' }}>Site Settings</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '2px solid #ddd' }}>
        <button
          onClick={() => setActiveTab('faqs')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: activeTab === 'faqs' ? '#007bff' : 'transparent',
            color: activeTab === 'faqs' ? 'white' : '#333',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          FAQs
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: activeTab === 'contact' ? '#007bff' : 'transparent',
            color: activeTab === 'contact' ? 'white' : '#333',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Contact
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: activeTab === 'pricing' ? '#007bff' : 'transparent',
            color: activeTab === 'pricing' ? 'white' : '#333',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Pricing
        </button>
        <button
          onClick={() => setActiveTab('homepage')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: activeTab === 'homepage' ? '#007bff' : 'transparent',
            color: activeTab === 'homepage' ? 'white' : '#333',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0'
          }}
        >
          Homepage
        </button>
      </div>

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="card">
          <h2>Manage FAQs</h2>
          {settingsData.faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
              <div className="form-group">
                <label>Question</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Answer</label>
                <textarea
                  rows="3"
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                />
              </div>
              <button onClick={() => removeFAQ(index)} className="btn btn-secondary">Remove</button>
            </div>
          ))}
          <button onClick={addFAQ} className="btn btn-secondary" style={{ marginRight: '0.5rem' }}>Add FAQ</button>
          <button onClick={handleUpdateFAQs} className="btn btn-primary">Save FAQs</button>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="card">
          <h2>Contact Details</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={settingsData.contactDetails.email}
              onChange={(e) => setSettingsData({
                ...settingsData,
                contactDetails: { ...settingsData.contactDetails, email: e.target.value }
              })}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={settingsData.contactDetails.phone}
              onChange={(e) => setSettingsData({
                ...settingsData,
                contactDetails: { ...settingsData.contactDetails, phone: e.target.value }
              })}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              rows="3"
              value={settingsData.contactDetails.address}
              onChange={(e) => setSettingsData({
                ...settingsData,
                contactDetails: { ...settingsData.contactDetails, address: e.target.value }
              })}
            />
          </div>
          <button onClick={handleUpdateContact} className="btn btn-primary">Save Contact Details</button>
        </div>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="card">
          <h2>Pricing Rules</h2>
          <div className="form-group">
            <label>Mini Project (₹)</label>
            <input
              type="number"
              value={settingsData.pricingRules.mini}
              onChange={(e) => setSettingsData({
                ...settingsData,
                pricingRules: { ...settingsData.pricingRules, mini: parseFloat(e.target.value) }
              })}
            />
          </div>
          <div className="form-group">
            <label>Major Project (₹)</label>
            <input
              type="number"
              value={settingsData.pricingRules.major}
              onChange={(e) => setSettingsData({
                ...settingsData,
                pricingRules: { ...settingsData.pricingRules, major: parseFloat(e.target.value) }
              })}
            />
          </div>
          <button onClick={handleUpdatePricing} className="btn btn-primary">Save Pricing</button>
        </div>
      )}

      {/* Homepage Tab */}
      {activeTab === 'homepage' && (
        <div className="card">
          <h2>Homepage Content</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={settingsData.homepageContent.title}
              onChange={(e) => setSettingsData({
                ...settingsData,
                homepageContent: { ...settingsData.homepageContent, title: e.target.value }
              })}
            />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <textarea
              rows="3"
              value={settingsData.homepageContent.subtitle}
              onChange={(e) => setSettingsData({
                ...settingsData,
                homepageContent: { ...settingsData.homepageContent, subtitle: e.target.value }
              })}
            />
          </div>
          <button onClick={handleUpdateHomepage} className="btn btn-primary">Save Homepage Content</button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Settings;

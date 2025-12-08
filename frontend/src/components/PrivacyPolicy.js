import React from 'react';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '2px solid #2C3E50',
            color: '#2C3E50',
            padding: '0.5rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '2rem',
            fontWeight: '600'
          }}
        >
          ← Back to Home
        </button>

        <h1 style={{ fontSize: '2.5rem', color: '#2C3E50', marginBottom: '1rem' }}>
          🔒 Privacy Policy
        </h1>
        <p style={{ color: '#7F8C8D', marginBottom: '2rem' }}>
          Last Updated: December 9, 2024
        </p>

        <div style={{ lineHeight: '1.8', color: '#34495E' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            ProjectHub respects your privacy and is committed to protecting your personal data.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>We collect the following personal information:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>College and branch (if provided)</li>
            <li>Project details and uploaded files</li>
            <li>Login activity and usage data</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>Your data is used to:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Create and manage your account</li>
            <li>Process project requests</li>
            <li>Communicate project updates</li>
            <li>Improve our platform and services</li>
            <li>Provide customer support</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            3. Data Security
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We take reasonable security measures to protect your data. However, no online platform is completely secure.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            4. File Uploads
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>Files uploaded are strictly used for:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Project development</li>
            <li>Review and delivery</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            We do not share files with third parties without permission.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            5. Cookies
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>ProjectHub may use cookies for:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Login sessions</li>
            <li>Website analytics</li>
            <li>Performance improvements</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            6. Third-Party Services
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>We may use third-party tools such as:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Email services</li>
            <li>Hosting services</li>
            <li>Analytics tools (Google Analytics)</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            These services have their own privacy policies.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            7. User Rights
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>You have the right to:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Update your personal information</li>
            <li>Request account deletion</li>
            <li>Contact us regarding data concerns</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            8. Policy Updates
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            This Privacy Policy may be updated periodically. Continued use of the platform implies acceptance of updated policies.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            9. Contact Us
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            For privacy-related concerns, contact us at:<br />
            📧 <a href="mailto:projecthub.helpdesk@gmail.com" style={{ color: '#5DADE2', textDecoration: 'none' }}>projecthub.helpdesk@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

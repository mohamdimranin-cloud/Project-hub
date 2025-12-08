import React from 'react';
import { useNavigate } from 'react-router-dom';

function TermsAndConditions() {
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
          📜 Terms & Conditions
        </h1>
        <p style={{ color: '#7F8C8D', marginBottom: '2rem' }}>
          Last Updated: December 9, 2024
        </p>

        <div style={{ lineHeight: '1.8', color: '#34495E' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to ProjectHub. By accessing and using our website, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            1. About ProjectHub
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            ProjectHub is an online platform that allows users to submit project requirements for Mini Projects, Major Projects, Prototypes, and Documentation Services. The platform connects users with the admin for development and delivery.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            2. User Responsibilities
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>By using ProjectHub, you agree that:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>You will provide accurate and complete information while registering and submitting project requirements.</li>
            <li>You will not submit illegal, copied, or prohibited content.</li>
            <li>You will not misuse the platform for fraud, spam, or harmful activities.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            3. Project Submission & Delivery
          </h2>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>All project requirements submitted by users are reviewed by the admin.</li>
            <li>The delivery timeline depends on the project complexity.</li>
            <li>Changes during development must be submitted through the revision request process.</li>
            <li>Final source code or documents are released only after admin approval.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            4. Source Code & Content Usage
          </h2>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Users are granted the right to use the delivered project for academic and personal purposes only.</li>
            <li>Redistribution, resale, or commercial use of delivered source code without permission is strictly prohibited.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            5. Payments
          </h2>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Any payment made is for service and development effort only.</li>
            <li>ProjectHub does not guarantee refunds once the development process has started.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            6. Account Termination
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>ProjectHub reserves the right to suspend or terminate user accounts for:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Misuse of the platform</li>
            <li>Fraudulent behavior</li>
            <li>Violation of terms</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            7. Limitation of Liability
          </h2>
          <p style={{ marginBottom: '0.5rem' }}>ProjectHub will not be responsible for:</p>
          <ul style={{ marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Academic penalties due to plagiarism or improper use</li>
            <li>Data loss caused by third-party services</li>
            <li>Delays caused by incorrect project requirements</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            8. Modifications to Terms
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            ProjectHub reserves the right to modify these terms at any time. Changes will be updated on this page.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#2C3E50', marginTop: '2rem', marginBottom: '1rem' }}>
            9. Contact Information
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            For any questions regarding these Terms:<br />
            📧 <a href="mailto:projecthub.helpdesk@gmail.com" style={{ color: '#5DADE2', textDecoration: 'none' }}>projecthub.helpdesk@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPageNew.css';

const LandingPageNew = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-new">
      {/* Top Navigation Bar */}
      <nav className="landing-nav">
        <div className="landing-nav-content">
          <div className="landing-logo">
            <span style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>PROJECT<span style={{ color: '#FFD700' }}>HUB</span></span>
          </div>
          <div className="landing-nav-buttons">
            <button className="nav-btn-login" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="nav-btn-signup" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">Turn Your Ideas Into Real Projects</h1>
            <p className="hero-subtitle">
              Submit your mini or major project requirements and get complete solutions 
              with source code, documentation, and live tracking.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Post Your Project
              </button>
              <button className="btn-secondary" onClick={() => {
                document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
              }}>
                View How It Works
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="mockup-content">
                <div className="mockup-card">
                  <div className="mockup-icon">📊</div>
                  <div className="mockup-text">
                    <div className="mockup-title">Project Dashboard</div>
                    <div className="mockup-status">Live Tracking</div>
                  </div>
                </div>
                <div className="mockup-progress">
                  <div className="progress-bar" style={{width: '75%'}}></div>
                </div>
                <div className="mockup-stats">
                  <div className="stat-item">
                    <div className="stat-value">24</div>
                    <div className="stat-label">Active Projects</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">98%</div>
                    <div className="stat-label">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">📝</div>
            <div className="step-number">01</div>
            <h3 className="step-title">Post Your Requirement</h3>
            <p className="step-description">Submit project details with your specific requirements</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-icon">⚙️</div>
            <div className="step-number">02</div>
            <h3 className="step-title">We Build Your Project</h3>
            <p className="step-description">Admin reviews and starts development work</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-icon">📈</div>
            <div className="step-number">03</div>
            <h3 className="step-title">Track Progress</h3>
            <p className="step-description">Live dashboard updates on your project status</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-icon">✅</div>
            <div className="step-number">04</div>
            <h3 className="step-title">Download & Submit</h3>
            <p className="step-description">Get final files with complete documentation</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Easy Project Submission</h3>
            <p className="feature-description">Simple form to submit your project requirements in minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Live Project Tracking</h3>
            <p className="feature-description">Real-time updates on your project development status</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">Prototype & Documentation</h3>
            <p className="feature-description">Support for prototypes, designs, and technical documentation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure File Delivery</h3>
            <p className="feature-description">Protected download system with admin approval</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Revision Requests</h3>
            <p className="feature-description">Request changes and improvements to your project</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍💼</div>
            <h3 className="feature-title">Admin-Guided Development</h3>
            <p className="feature-description">Expert guidance throughout the project lifecycle</p>
          </div>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="audience-section">
        <h2 className="section-title">Who Is It For?</h2>
        <div className="audience-grid">
          <div className="audience-card">
            <div className="audience-icon">🎓</div>
            <h3 className="audience-title">Engineering Students</h3>
            <p className="audience-description">Perfect for semester projects and assignments</p>
          </div>
          <div className="audience-card">
            <div className="audience-icon">👥</div>
            <h3 className="audience-title">Final Year Project Groups</h3>
            <p className="audience-description">Complete solutions for major projects</p>
          </div>
          <div className="audience-card">
            <div className="audience-icon">💼</div>
            <h3 className="audience-title">Internship Seekers</h3>
            <p className="audience-description">Build portfolio projects to showcase skills</p>
          </div>
          <div className="audience-card">
            <div className="audience-icon">🚀</div>
            <h3 className="audience-title">Startups & Innovators</h3>
            <p className="audience-description">Rapid prototyping and MVP development</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-container">
          <div className="trust-badge">
            <div className="trust-icon">🛡️</div>
            <div className="trust-text">
              <div className="trust-title">Secure Platform</div>
              <div className="trust-subtitle">Your data is protected</div>
            </div>
          </div>
          <div className="trust-badge">
            <div className="trust-icon">⏰</div>
            <div className="trust-text">
              <div className="trust-title">On-Time Delivery</div>
              <div className="trust-subtitle">Meet your deadlines</div>
            </div>
          </div>
          <div className="trust-badge">
            <div className="trust-icon">💙</div>
            <div className="trust-text">
              <div className="trust-title">Student Friendly</div>
              <div className="trust-subtitle">Built for students</div>
            </div>
          </div>
          <div className="trust-badge">
            <div className="trust-icon">✓</div>
            <div className="trust-text">
              <div className="trust-title">Quality Check</div>
              <div className="trust-subtitle">Manual review process</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Got my final year project completed on time with excellent documentation. 
              The live tracking feature was really helpful!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div className="author-info">
                <div className="author-name">Amit Kumar</div>
                <div className="author-role">Computer Science Student</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "The prototype development service helped me visualize my idea perfectly. 
              Great support from the admin team!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">P</div>
              <div className="author-info">
                <div className="author-name">Priya Sharma</div>
                <div className="author-role">IT Engineering Student</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Simple process, professional results. Got my mini project with complete 
              source code and documentation. Highly recommended!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">R</div>
              <div className="author-info">
                <div className="author-name">Rahul Verma</div>
                <div className="author-role">Electronics Student</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <h2 className="cta-title">Ready to Start Your Project?</h2>
        <p className="cta-subtitle">Join hundreds of students who have successfully completed their projects</p>
        <button className="btn-cta" onClick={() => navigate('/register')}>
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#how-it-works">How It Works</a>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="footer-copyright">
            © 2024 ProjectHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageNew;

import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPageClean() {
  const navigate = useNavigate();

  const styles = {
    // Navigation
    nav: {
      background: 'white',
      padding: '1rem 0',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderBottom: '1px solid #E8E8E8'
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 2rem'
    },
    navButtons: {
      display: 'flex',
      gap: '1rem'
    },
    btnPrimary: {
      background: '#2C3E50',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease'
    },
    btnSecondary: {
      background: 'white',
      color: '#2C3E50',
      border: '2px solid #2C3E50',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease'
    },
    // Hero Section
    hero: {
      background: 'white',
      padding: '120px 2rem 80px',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center'
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },
    heroLeft: {
      maxWidth: '600px'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      color: '#2C3E50',
      lineHeight: '1.2',
      marginBottom: '1.5rem'
    },
    heroSubtext: {
      fontSize: '1.25rem',
      color: '#7F8C8D',
      lineHeight: '1.6',
      marginBottom: '2.5rem'
    },
    heroCTA: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    heroRight: {
      background: 'linear-gradient(135deg, #F0F4F8 0%, #E8F4F8 100%)',
      borderRadius: '16px',
      padding: '3rem',
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    // Section
    section: {
      padding: '5rem 2rem',
      background: '#F8F9FA'
    },
    sectionWhite: {
      padding: '5rem 2rem',
      background: 'white'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2C3E50',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      color: '#7F8C8D',
      textAlign: 'center',
      marginBottom: '3rem',
      maxWidth: '600px',
      margin: '0 auto 3rem'
    }
  };

  return (
    <div style={{ background: '#F8F9FA' }}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={require('../images/logo.png')} alt="ProjectHub" style={{ height: '40px' }} />
          </div>
          <div style={styles.navButtons}>
            <button 
              onClick={() => navigate('/login')}
              style={styles.btnSecondary}
              onMouseOver={(e) => {
                e.target.style.background = '#2C3E50';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#2C3E50';
              }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              style={styles.btnPrimary}
              onMouseOver={(e) => {
                e.target.style.background = '#1A252F';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#2C3E50';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              Turn Your Ideas Into Real Projects
            </h1>
            <p style={styles.heroSubtext}>
              Submit your mini or major project requirements and get complete solutions with source code, documentation, and live tracking.
            </p>
            <div style={styles.heroCTA}>
              <button 
                onClick={() => navigate('/signup')}
                style={{...styles.btnPrimary, padding: '1rem 2.5rem', fontSize: '1.1rem'}}
              >
                🚀 Post Your Project
              </button>
              <button 
                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                style={{...styles.btnSecondary, padding: '1rem 2.5rem', fontSize: '1.1rem'}}
              >
                View How It Works
              </button>
            </div>
          </div>
          <div style={styles.heroRight}>
            <div>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📊</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2C3E50' }}>
                Dashboard Preview
              </div>
              <div style={{ fontSize: '1rem', color: '#7F8C8D', marginTop: '0.5rem' }}>
                Track your projects in real-time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue in next part... */}
    </div>
  );
}

export default LandingPageClean;

      {/* Success Counter */}
      <section style={{ padding: '2rem', background: '#2C3E50', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>150+</div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Projects Delivered</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>98%</div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Success Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>200+</div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Happy Students</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>24/7</div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Support</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={styles.sectionWhite}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionSubtitle}>Get your project done in 4 simple steps</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '📝', title: 'Post Your Requirement', desc: 'Submit project details with budget and deadline' },
              { icon: '⚙️', title: 'We Build Your Project', desc: 'Admin reviews and starts development' },
              { icon: '📊', title: 'Track Progress', desc: 'Live dashboard updates in real-time' },
              { icon: '📦', title: 'Download & Submit', desc: 'Get source code, docs, and PPT' }
            ].map((step, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid #E8E8E8',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{step.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2C3E50', marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: '#7F8C8D', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Why Choose ProjectHub?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {[
              { icon: '📤', title: 'Easy Project Submission', desc: 'Post your project in minutes with simple forms' },
              { icon: '📈', title: 'Live Project Tracking', desc: 'Monitor status and progress in real-time' },
              { icon: '⚡', title: 'Prototype & Documentation', desc: 'Get MVPs, UI demos, and academic reports' },
              { icon: '🔐', title: 'Secure File Delivery', desc: 'Download source code safely from dashboard' },
              { icon: '🔄', title: 'Revision Requests', desc: 'Free revisions to meet your requirements' },
              { icon: '👨‍💼', title: 'Admin-Guided Development', desc: 'Direct communication with development team' }
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid #E8E8E8',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2C3E50', marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#7F8C8D', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section style={styles.sectionWhite}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Who Is ProjectHub For?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {[
              { icon: '🎓', title: 'Engineering Students', desc: 'Complete your academic projects' },
              { icon: '👥', title: 'Final Year Groups', desc: 'Collaborative project solutions' },
              { icon: '💼', title: 'Internship Seekers', desc: 'Build portfolio projects' },
              { icon: '💡', title: 'Startups & Innovators', desc: 'Prototype your ideas' }
            ].map((audience, i) => (
              <div key={i} style={{
                background: '#F0F4F8',
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #E8E8E8'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{audience.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2C3E50', marginBottom: '0.5rem' }}>
                  {audience.title}
                </h3>
                <p style={{ color: '#7F8C8D' }}>{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={styles.section}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={styles.sectionTitle}>Why Students Trust Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {[
              { icon: '🔒', title: 'Secure Platform', desc: 'Your data is encrypted and safe' },
              { icon: '⏰', title: 'On-Time Delivery', desc: 'Projects delivered within deadline' },
              { icon: '🎓', title: 'Student Friendly', desc: 'Designed for academic needs' },
              { icon: '✅', title: 'Quality Checked', desc: 'Manual review by experts' }
            ].map((trust, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid #E8E8E8'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{trust.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2C3E50', marginBottom: '0.5rem' }}>
                  {trust.title}
                </h3>
                <p style={{ color: '#7F8C8D', fontSize: '0.95rem' }}>{trust.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.sectionWhite}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>⭐ Student Reviews</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {[
              { name: 'Rahul Kumar', college: 'VTU', text: 'ProjectHub helped me complete my final year project on time with perfect documentation!' },
              { name: 'Priya Sharma', college: 'Anna University', text: 'Very smooth process. Got my ML project with complete source code!' },
              { name: 'Arjun Patel', college: 'JNTU', text: 'Excellent service! The prototype was exactly what I needed.' }
            ].map((review, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid #E8E8E8',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#F39C12' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color: '#7F8C8D', lineHeight: '1.6', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{review.text}"
                </p>
                <div style={{ fontWeight: '600', color: '#2C3E50' }}>{review.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#7F8C8D' }}>{review.college}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

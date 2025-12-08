import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      {/* Navigation */}
      <nav style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem 0',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={require('../images/logo.png')} alt="ProjectHub" style={{ height: '40px', marginRight: '10px' }} />
            <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>ProjectHub</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '120px 2rem 80px',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Turn Your Ideas Into Ready-to-Use Projects
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Post your mini or major project requirements and get fully developed solutions with source code, documentation, and delivery updates—all in one place.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}
            >
              🚀 Post Your Project
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              📖 View How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ padding: '3rem 2rem', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Secure Platform</h3>
            <p style={{ color: '#666' }}>Your data and projects are safe with us</p>
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏰</div>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>On-Time Delivery</h3>
            <p style={{ color: '#666' }}>Projects delivered within deadline</p>
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍💻</div>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Expert Developers</h3>
            <p style={{ color: '#666' }}>Experienced team for quality work</p>
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Student Friendly</h3>
            <p style={{ color: '#666' }}>Designed specifically for students</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '3rem' }}>How ProjectHub Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div style={{ padding: '2rem', borderRadius: '15px', background: '#f8f9fa' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Step 1 – Post Your Requirement</h3>
              <p style={{ color: '#666' }}>Submit your mini or major project details including category, technology, deadline, and budget.</p>
            </div>
            <div style={{ padding: '2rem', borderRadius: '15px', background: '#f8f9fa' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Step 2 – Admin Review & Approval</h3>
              <p style={{ color: '#666' }}>Our team reviews your request and starts the development process.</p>
            </div>
            <div style={{ padding: '2rem', borderRadius: '15px', background: '#f8f9fa' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Step 3 – Track Live Progress</h3>
              <p style={{ color: '#666' }}>Monitor your project status in real time from your dashboard.</p>
            </div>
            <div style={{ padding: '2rem', borderRadius: '15px', background: '#f8f9fa' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Step 4 – Download Final Project</h3>
              <p style={{ color: '#666' }}>Receive source code, reports, PPT, and demo after completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 2rem', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#333', textAlign: 'center', marginBottom: '3rem' }}>Why Choose ProjectHub?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>📤</div>
              <div>
                <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Easy Project Submission</h3>
                <p style={{ color: '#666' }}>Post your project idea in minutes with file uploads and detailed description.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>📈</div>
              <div>
                <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Real-Time Project Tracking</h3>
                <p style={{ color: '#666' }}>Check whether your project is open, in progress, delivered, or completed.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>🔐</div>
              <div>
                <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Secure File Delivery</h3>
                <p style={{ color: '#666' }}>Download your final project safely through your dashboard.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>💬</div>
              <div>
                <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Direct Admin Communication</h3>
                <p style={{ color: '#666' }}>Clarify doubts and request changes easily.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>📊</div>
              <div>
                <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Analytics & Dashboard</h3>
                <p style={{ color: '#666' }}>Track your activity, project performance, and completion rate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is ProjectHub For */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '2rem' }}>Who Is ProjectHub For?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ padding: '1.5rem', borderRadius: '10px', background: '#e7f5ff' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓</div>
              <h3 style={{ color: '#667eea' }}>College Students</h3>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '10px', background: '#e7f5ff' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚙️</div>
              <h3 style={{ color: '#667eea' }}>Engineering Students</h3>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '10px', background: '#e7f5ff' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ color: '#667eea' }}>Final Year Project Groups</h3>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '10px', background: '#e7f5ff' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💼</div>
              <h3 style={{ color: '#667eea' }}>Internship Seekers</h3>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '10px', background: '#e7f5ff' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💡</div>
              <h3 style={{ color: '#667eea' }}>Startup Idea Holders</h3>
            </div>
          </div>
          <p style={{ fontSize: '1.2rem', color: '#667eea', fontWeight: 'bold' }}>
            If you have a project idea—ProjectHub builds it for you.
          </p>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Everything in One Smart Dashboard</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
            Track project status, upload requirements, download final files, and manage revisions—all from one place.
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '3rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
                <h3>Project Status</h3>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📤</div>
                <h3>File Upload</h3>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📥</div>
                <h3>Download Files</h3>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
                <h3>Manage Revisions</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 2rem', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '3rem' }}>What Students Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                "ProjectHub helped me complete my final year project on time with perfect documentation."
              </p>
              <div style={{ color: '#667eea', fontWeight: 'bold' }}>- Engineering Student</div>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                "Very smooth process from submission to delivery. Highly recommended."
              </p>
              <div style={{ color: '#667eea', fontWeight: 'bold' }}>- Computer Science Student</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Build Your Project?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Submit your requirement today and get your complete project delivered without stress.
          </p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
            }}
          >
            🚀 Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#333', color: 'white', padding: '3rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <img src={require('../images/logo.png')} alt="ProjectHub" style={{ height: '30px', marginRight: '10px' }} />
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>ProjectHub</span>
              </div>
              <p style={{ color: '#ccc' }}>Turn your ideas into ready-to-use projects</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>About ProjectHub</a>
                <a href="#how-it-works" style={{ color: '#ccc', textDecoration: 'none' }}>How It Works</a>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Contact Support</a>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Terms & Conditions</a>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
              <p style={{ color: '#ccc' }}>Email: support@projecthub.com</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #555', paddingTop: '2rem', textAlign: 'center', color: '#ccc' }}>
            <p>&copy; 2024 ProjectHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
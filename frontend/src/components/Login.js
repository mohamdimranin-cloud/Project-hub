import { useState } from 'react';
import { auth } from '../api';
import logo from '../images/logo.png';

function Login({ onLogin, isSignup = false }) {
  const [isRegister, setIsRegister] = useState(isSignup);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '', 
    branch: '', 
    college: '', 
    role: 'requester' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = isRegister 
        ? await auth.register(formData)
        : await auth.login(formData);
      onLogin(response.data.token, response.data.user);
    } catch (error) {
      alert(error.response?.data?.error || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      background: '#F8F9FA'
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        {/* Logo/Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img 
            src={logo} 
            alt="ProjectHub Logo" 
            style={{ 
              width: '180px', 
              height: 'auto', 
              marginBottom: '1.5rem'
            }} 
          />
          <h1 style={{ 
            fontSize: '1.75rem', 
            color: '#2C3E50', 
            marginBottom: '0.5rem',
            fontWeight: '700'
          }}>
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: '#7F8C8D', fontSize: '1rem' }}>
            {isRegister 
              ? 'Join thousands of students getting projects done' 
              : 'Sign in to manage your projects'
            }
          </p>
        </div>

        <div className="card" style={{ 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #E8E8E8',
          borderRadius: '16px'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'inline-block',
              padding: '8px 16px',
              background: '#F0F4F8',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.875rem', color: '#2C3E50', fontWeight: '600' }}>
                {isRegister ? 'STEP 1 OF 1' : 'LOGIN'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="form-group">
                  <label>👤 Full Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>📱 Phone Number *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
              </>
            )}
            
            <div className="form-group">
              <label>📧 Email Address *</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label>🔒 Password *</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder={isRegister ? "Create a strong password" : "Enter your password"}
                  required
                  minLength={isRegister ? 6 : undefined}
                  style={{ paddingRight: '45px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '4px 8px',
                    color: '#666',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#333'}
                  onMouseLeave={(e) => e.target.style.color = '#666'}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {isRegister ? (
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                  Password must be at least 6 characters
                </div>
              ) : (
                <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => alert('Please contact admin to reset your password')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#667eea',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: '0'
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
            
            {isRegister && (
              <>
                <div className="form-group">
                  <label>🎓 Branch/Department *</label>
                  <input 
                    type="text" 
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>🏫 College/University *</label>
                  <input 
                    type="text" 
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                    placeholder="e.g., ABC University"
                    required
                  />
                </div>
              </>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                marginTop: '1rem',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '700'
              }}
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? '⏳ Please wait...' 
                : isRegister 
                  ? '🚀 Create Account' 
                  : '🔓 Sign In'
              }
            </button>
          </form>

          {/* Google Login Section */}
          <div style={{ 
            marginTop: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '1rem'
            }}>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
              <span style={{ color: '#999', fontSize: '0.85rem' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
            </div>
            <button
              type="button"
              onClick={() => {
                const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
                window.location.href = `${apiUrl}/auth/google`;
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'white',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#4285f4';
                e.target.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
              disabled={isSubmitting}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
              </svg>
              <span style={{ color: '#333' }}>Continue with Google</span>
            </button>
          </div>
          
          <div style={{ 
            marginTop: '1.5rem', 
            paddingTop: '1.5rem', 
            borderTop: '2px solid #e0e0e0',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setFormData({ 
                  email: '', 
                  password: '', 
                  name: '', 
                  phone: '', 
                  branch: '', 
                  college: '', 
                  role: 'requester' 
                });
              }} 
              className="btn btn-secondary" 
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              {isRegister ? '🔐 Sign In Instead' : '📝 Create New Account'}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center', 
          color: '#2C3E50',
          fontWeight: '500'
        }}>
          <p style={{ fontSize: '0.9rem' }}>
            🔒 Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

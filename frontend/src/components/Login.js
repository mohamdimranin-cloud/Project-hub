import { useState } from 'react';
import { auth } from '../api';
import logo from '../images/logo.png';

function Login({ onLogin, isSignup = false }) {
  const [isRegister, setIsRegister] = useState(isSignup);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        {/* Logo/Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src={logo} 
            alt="ProjectHub Logo" 
            style={{ 
              width: '200px', 
              height: 'auto', 
              marginBottom: '1rem',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }} 
          />
          <p style={{ color: 'white', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Connect students with developers
          </p>
        </div>

        <div className="card" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '2rem',
              color: '#333',
              marginBottom: '0.5rem'
            }}>
              {isRegister ? '📝 Create Account' : '🔐 Welcome Back'}
            </h2>
            <p style={{ color: '#666' }}>
              {isRegister 
                ? 'Fill in your details to get started' 
                : 'Sign in to continue to your account'
              }
            </p>
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
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder={isRegister ? "Create a strong password" : "Enter your password"}
                required
                minLength={isRegister ? 6 : undefined}
              />
              {isRegister && (
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                  Password must be at least 6 characters
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
                fontWeight: '700',
                background: 'linear-gradient(135deg, #5DADE2 0%, #48C9B0 100%)',
                border: 'none'
              }}
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? '⏳ Please wait...' 
                : isRegister 
                  ? '📧 Continue with Email' 
                  : '📧 Sign In with Email'
              }
            </button>
          </form>

          {/* OR Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '1.5rem 0',
            gap: '1rem'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
            <span style={{ color: '#999', fontSize: '0.9rem', fontWeight: '600' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
          </div>

          {/* Google Login Button */}
          <button 
            onClick={handleGoogleLogin}
            type="button"
            style={{ 
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              background: 'white',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              color: '#333'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#5DADE2';
              e.target.style.boxShadow = '0 4px 12px rgba(93, 173, 226, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
            disabled={isSubmitting}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
              <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          
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
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
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

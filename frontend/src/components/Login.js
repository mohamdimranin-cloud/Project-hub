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

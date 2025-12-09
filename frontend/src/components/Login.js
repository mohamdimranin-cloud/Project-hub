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

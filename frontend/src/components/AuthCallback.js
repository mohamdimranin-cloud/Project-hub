import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthCallback({ onLogin }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      alert('Authentication failed. Please try again.');
      navigate('/login');
      return;
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        onLogin(token, user);
        navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      } catch (err) {
        console.error('Auth callback error:', err);
        alert('Authentication error. Please try again.');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, onLogin]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <h2>Completing authentication...</h2>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}

export default AuthCallback;

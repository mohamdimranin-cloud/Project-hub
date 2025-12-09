import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPageNew from './components/LandingPageNew';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import AdminPanel from './components/AdminPanel';
import AdminDashboard from './components/AdminDashboard';
import AdminProjectManagement from './components/AdminProjectManagement';
import AdminKanbanBoard from './components/AdminKanbanBoard';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Chatbot from './components/Chatbot';
import AuthCallback from './components/AuthCallback';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      console.log('Loading user from localStorage:', parsedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const location = window.location.pathname;
  const showChatbot = !['/terms', '/privacy'].includes(location);

  return (
    <BrowserRouter>
      {user && user.role !== 'admin' && <Navbar user={user} onLogout={handleLogout} />}
      {showChatbot && <Chatbot />}
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : user.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/student/dashboard" />} />
        <Route path="/signup" element={!user ? <Login onLogin={handleLogin} isSignup={true} /> : user.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/student/dashboard" />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={
          user ? (
            user.role === 'requester' ? <Dashboard user={user} /> : <Navigate to="/admin/dashboard" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/student/projects" element={
          user ? (
            user.role === 'requester' ? <ProjectList user={user} /> : <Navigate to="/admin/projects" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/student/projects/:id" element={
          user ? (
            user.role === 'requester' ? <ProjectDetail user={user} /> : <Navigate to="/admin/projects" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/student/create-project" element={
          user ? (
            user.role === 'requester' ? <CreateProject /> : <Navigate to="/admin/dashboard" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/student/projects/:id/edit" element={
          user ? (
            user.role === 'requester' ? <EditProject /> : <Navigate to="/admin/dashboard" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/student/profile" element={
          user ? (
            user.role === 'requester' ? <Profile user={user} onUpdateUser={handleUpdateUser} /> : <Navigate to="/admin/profile" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/student/notifications" element={
          user ? (
            user.role === 'requester' ? <Notifications user={user} /> : <Navigate to="/admin/notifications" replace />
          ) : <Navigate to="/login" replace />
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          user ? (
            user.role === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/student/dashboard" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/admin/users" element={
          user ? (
            user.role === 'admin' ? <AdminPanel onLogout={handleLogout} /> : <Navigate to="/student/dashboard" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/admin/projects" element={
          user ? (
            user.role === 'admin' ? <AdminProjectManagement onLogout={handleLogout} /> : <Navigate to="/student/projects" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/admin/kanban" element={
          user ? (
            user.role === 'admin' ? <AdminKanbanBoard /> : <Navigate to="/student/dashboard" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/admin/projects/:id" element={
          user ? (
            user.role === 'admin' ? <ProjectDetail user={user} /> : <Navigate to="/student/projects" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/admin/settings" element={
          user ? (
            user.role === 'admin' ? <Settings onLogout={handleLogout} /> : <Navigate to="/student/dashboard" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/admin/notifications" element={
          user ? (
            user.role === 'admin' ? <Notifications user={user} onLogout={handleLogout} /> : <Navigate to="/student/notifications" replace />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/admin/profile" element={
          user ? (
            user.role === 'admin' ? <Profile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} /> : <Navigate to="/student/profile" replace />
          ) : <Navigate to="/login" replace />
        } />
        
        {/* Public Pages */}
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/auth/callback" element={<AuthCallback onLogin={handleLogin} />} />

        {/* Landing Page and Root Route */}
        <Route path="/" element={
          user ? (
            user.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/student/dashboard" replace />
          ) : (
            <LandingPageNew />
          )
        } />
        
        {/* Catch all - redirect to appropriate dashboard */}
        <Route path="*" element={
          user ? (
            user.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/student/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

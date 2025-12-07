import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const projects = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  updateStatus: (id, status) => api.patch(`/projects/${id}/status`, { status }),
  assignDeveloper: (id, developerId, estimatedDelivery) => api.patch(`/projects/${id}/assign`, { developerId, estimatedDelivery }),
  addProgress: (id, message) => api.post(`/projects/${id}/progress`, { message }),
  addDeliverable: (id, data) => api.post(`/projects/${id}/deliverables`, data),
  requestRevision: (id, reason) => api.post(`/projects/${id}/revision`, { reason }),
  complete: (id) => api.patch(`/projects/${id}/complete`),
  updateNotes: (id, notes) => api.patch(`/projects/${id}/notes`, { notes }),
};

export const users = {
  getMe: () => api.get('/users/me'),
  updateMe: (data) => api.patch('/users/me', data),
  changePassword: (data) => api.patch('/users/me/password', data),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  updateRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  updateStatus: (id, isActive) => api.patch(`/users/${id}/status`, { isActive }),
  getProjects: (id) => api.get(`/users/${id}/projects`),
};

export const notifications = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

export const analytics = {
  getDashboard: () => api.get('/analytics'),
};

export const settings = {
  get: () => api.get('/settings'),
  updateFAQs: (faqs) => api.patch('/settings/faqs', { faqs }),
  updateContact: (data) => api.patch('/settings/contact', data),
  updatePricing: (data) => api.patch('/settings/pricing', data),
  updateHomepage: (data) => api.patch('/settings/homepage', data),
};

export default api;

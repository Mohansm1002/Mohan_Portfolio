import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
export const ADMIN_TOKEN_KEY = 'portfolio_admin_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  if (token && config.url?.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProfile = () => api.get('/profile').then((response) => response.data);
export const getSkills = () => api.get('/skills').then((response) => response.data);
export const getProfessionalSkills = () =>
  api.get('/professional-skills').then((response) => response.data);
export const getProjects = () => api.get('/projects').then((response) => response.data);
export const getCertifications = () =>
  api.get('/certifications').then((response) => response.data);
export const createContactMessage = (payload) =>
  api.post('/contact', payload).then((response) => response.data);

export const loginAdmin = (payload) =>
  api.post('/admin/login', payload).then((response) => response.data);
export const getAdminMessages = () =>
  api.get('/admin/messages').then((response) => response.data);
export const deleteAdminMessage = (id) =>
  api.delete(`/admin/messages/${id}`).then((response) => response.data);

export const createAdminSkill = (payload) =>
  api.post('/admin/skills', payload).then((response) => response.data);
export const updateAdminSkill = (id, payload) =>
  api.put(`/admin/skills/${id}`, payload).then((response) => response.data);
export const deleteAdminSkill = (id) =>
  api.delete(`/admin/skills/${id}`).then((response) => response.data);

export const createAdminProfessionalSkill = (payload) =>
  api.post('/admin/professional-skills', payload).then((response) => response.data);
export const updateAdminProfessionalSkill = (id, payload) =>
  api.put(`/admin/professional-skills/${id}`, payload).then((response) => response.data);
export const deleteAdminProfessionalSkill = (id) =>
  api.delete(`/admin/professional-skills/${id}`).then((response) => response.data);

export const createAdminProject = (payload) =>
  api.post('/admin/projects', payload).then((response) => response.data);
export const updateAdminProject = (id, payload) =>
  api.put(`/admin/projects/${id}`, payload).then((response) => response.data);
export const deleteAdminProject = (id) =>
  api.delete(`/admin/projects/${id}`).then((response) => response.data);

export const createAdminCertification = (payload) =>
  api.post('/admin/certifications', payload).then((response) => response.data);
export const updateAdminCertification = (id, payload) =>
  api.put(`/admin/certifications/${id}`, payload).then((response) => response.data);
export const deleteAdminCertification = (id) =>
  api.delete(`/admin/certifications/${id}`).then((response) => response.data);

export const updateAdminProfile = (payload) =>
  api.put('/admin/profile', payload).then((response) => response.data);

export default api;

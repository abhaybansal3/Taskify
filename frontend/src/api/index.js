import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/signup', formData);

export const fetchActivities = () => API.get('/activities');
export const fetchProjects = () => API.get('/projects');
export const createProject = (projectData) => API.post('/projects', projectData);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const fetchTasks = (projectId) => API.get(`/tasks/project/${projectId}`);
export const fetchMyTasks = () => API.get('/tasks/my-tasks');
export const fetchVisibleTasks = () => API.get('/tasks/visible');
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (id, updatedData) => API.patch(`/tasks/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const fetchUsers = () => API.get('/auth/users');
export const deleteUser = (id) => API.delete(`/auth/users/${id}`);
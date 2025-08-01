import axios from 'axios';

const API_URL = 'https://pro-tasker-v2-backend.onrender.com/api/projects/';
const getToken = () => localStorage.getItem('token');

const createTask = async (projectId, taskData) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(`${API_URL}${projectId}/tasks`, taskData, config);
  return response.data;
};

const getTasksByProject = async (projectId) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${API_URL}${projectId}/tasks`, config);
  return response.data;
};

const updateTask = async (projectId, taskId, taskData) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`${API_URL}${projectId}/tasks/${taskId}`, taskData, config);
  return response.data;
};

// ** ADD THIS FUNCTION **
const deleteTask = async (projectId, taskId) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}${projectId}/tasks/${taskId}`, config);
  return response.data;
};

const taskService = {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask, // Export the new function
};

export default taskService;
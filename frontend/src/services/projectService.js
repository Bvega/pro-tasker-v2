import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects/';
const getToken = () => localStorage.getItem('token');

// Create a new project
const createProject = async (projectData) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, projectData, config);
  return response.data;
};

// Get user projects
const getProjects = async () => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// ** ADD THIS FUNCTION **
// Get a single project by ID
const getProjectById = async (projectId) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + projectId, config);
  return response.data;
};

const projectService = {
  createProject,
  getProjects,
  getProjectById, // Export the new function
};

export default projectService;
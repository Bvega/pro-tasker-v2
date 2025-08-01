import axios from 'axios';

const API_URL = 'https://pro-tasker-v2-backend.onrender.com/api/users/';

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};


const authService = {
  login,
  register, // Add the new function here
};

export default authService;
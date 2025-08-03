import axios from 'axios';

// This line now correctly uses the environment variable
const API_URL = `${import.meta.env.VITE_API_URL}/api/users/`;

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
  register,
};

export default authService;
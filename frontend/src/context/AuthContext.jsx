import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs on initial load to check if a user is already logged in
    const fetchUser = async () => {
      if (token) {
        // In a real app, you'd verify the token with the backend and get user info
        // For now, we'll simulate it. We will replace this later.
        // Let's assume the token itself contains basic user info or we can fetch it.
        // For simplicity, we'll just set a placeholder user if a token exists.
        setUser({ name: 'User' }); // Placeholder
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // The value provided to consuming components
  const value = {
    token,
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy consumption of the context
export const useAuth = () => {
  return useContext(AuthContext);
};